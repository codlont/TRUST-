
// ============================================
// TRUST WALLET PROJECT
// Complete website interactions
// ============================================

document.addEventListener("DOMContentLoaded", function () {

  const wallet = document.getElementById("wallet");
  const coinSearch = document.getElementById("coinSearch");
  const assetRows = document.querySelectorAll(".asset-row");
  const noAssets = document.getElementById("noAssets");

  // Hide wallet dashboard initially
  if (wallet) {
    wallet.hidden = true;
  }

  // ASSET SEARCH
  if (coinSearch) {
    coinSearch.addEventListener("input", function () {

      const searchValue = coinSearch.value
        .toLowerCase()
        .trim();

      let visibleCount = 0;

      assetRows.forEach(function (asset) {

        const assetName = asset.dataset.name.toLowerCase();

        const matches = assetName.includes(searchValue);

        asset.hidden = !matches;

        if (matches) {
          visibleCount++;
        }

      });

      if (noAssets) {
        noAssets.hidden = visibleCount !== 0;
      }

    });
  }

  // SMOOTH NAVIGATION
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId = this.getAttribute("href");

      if (targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  });

});

// OPEN WALLET DASHBOARD
function showWallet() {

  const wallet = document.getElementById("wallet");

  if (!wallet) {
    return;
  }

  wallet.hidden = false;

  wallet.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}

// CLOSE WALLET DASHBOARD
function closeWallet() {

  const wallet = document.getElementById("wallet");

  if (!wallet) {
    return;
  }

  wallet.hidden = true;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

// WALLET ACTION DIALOG
function demoAction(action) {

  const dialog = document.getElementById("actionDialog");
  const title = document.getElementById("dialogTitle");
  const message = document.getElementById("dialogMessage");

  if (!dialog || !title || !message) {
    return;
  }

  title.textContent = action;

  const messages = {
    Send: "The send interface is ready for future blockchain integration. No cryptocurrency will be transferred in this demonstration.",
    Receive: "The receive interface is ready for future wallet integration. No real wallet address is generated.",
    Swap: "The swap interface is ready for future exchange integration. No cryptocurrency will be exchanged."
  };

  message.textContent =
    messages[action] || "This is a demonstration interface.";

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  }

}

// CLOSE ACTION DIALOG
function closeActionDialog() {

  const dialog = document.getElementById("actionDialog");

  if (dialog && dialog.open) {
    dialog.close();
  }

}

// SAMPLE CRYPTOCURRENCY DATA
const cryptoAssets = [

  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 67400,
    change: "+2.45%"
  },

  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3450,
    change: "+1.82%"
  },

  {
    name: "Tether",
    symbol: "USDT",
    price: 1,
    change: "0.01%"
  }

];

console.log("Wallet interface loaded successfully.");
