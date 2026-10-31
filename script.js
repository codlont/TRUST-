
// =====================================
// TRUST WALLET PROJECT
// Website interactions
// =====================================

// Open wallet dashboard
function showWallet() {
  const wallet = document.getElementById("wallet");

  wallet.hidden = false;

  wallet.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// Navigation links
document.addEventListener("DOMContentLoaded", function () {

  const wallet = document.getElementById("wallet");

  if (wallet) {
    wallet.hidden = true;
  }

  // Smooth navigation
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function () {
      const target = document.querySelector(
        this.getAttribute("href")
      );

      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

});

// Sample cryptocurrency data
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
