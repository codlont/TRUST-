
document.addEventListener("DOMContentLoaded", () => {
  const wallet = document.getElementById("wallet");
  const dialog = document.getElementById("actionDialog");
  const dialogTitle = document.getElementById("dialogTitle");
  const dialogMessage = document.getElementById("dialogMessage");
  const navigation = document.querySelector(".main-nav");

  // Smooth scrolling for homepage links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        navigation?.classList.remove("nav-open");
      }
    });
  });

  // Close mobile navigation after choosing a menu item
  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      navigation?.classList.remove("nav-open");
    });
  });

  // Close the dialog when clicking outside it
  dialog?.addEventListener("click", event => {
    if (event.target === dialog) {
      closeActionDialog();
    }
  });

  // Close dialog with Escape key
  dialog?.addEventListener("close", () => {
    document.body.style.overflow = "";
  });
});

function showWallet() {
  const wallet = document.getElementById("wallet");

  if (!wallet) return;

  wallet.hidden = false;

  setTimeout(() => {
    wallet.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 50);
}

function closeWallet() {
  const wallet = document.getElementById("wallet");

  if (!wallet) return;

  wallet.hidden = true;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function demoAction(action) {
  const dialog = document.getElementById("actionDialog");
  const title = document.getElementById("dialogTitle");
  const message = document.getElementById("dialogMessage");

  const explanations = {
    Send: "This is a demonstration. Sending real cryptocurrency is not enabled, and no wallet addresses or private keys are collected.",
    Receive: "This is a demonstration. No real receiving address is generated. Never share your recovery phrase with anyone.",
    Swap: "This is a demonstration. No real cryptocurrency exchange or blockchain transaction is performed."
  };

  if (!dialog || !title || !message) return;

  title.textContent = action + " Crypto";
  message.textContent = explanations[action] || "This feature is available for demonstration only.";

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
    document.body.style.overflow = "hidden";
  } else {
    alert(message.textContent);
  }
}

function closeActionDialog() {
  const dialog = document.getElementById("actionDialog");

  if (dialog?.open) {
    dialog.close();
  }
}

