const connectButton = document.getElementById("connectButton");
const statusText = document.getElementById("status");

function setStatus(message, type = "") {
  statusText.textContent = message;
  statusText.className = "status " + type;
}

function getTrustWalletProvider() {
  const ethereum = window.ethereum;

  if (!ethereum) {
    return null;
  }

  if (ethereum.isTrust || ethereum.isTrustWallet) {
    return ethereum;
  }

  if (Array.isArray(ethereum.providers)) {
    return ethereum.providers.find(
      provider => provider.isTrust || provider.isTrustWallet
    ) || null;
  }

  return null;
}

connectButton.addEventListener("click", async () => {
  const provider = getTrustWalletProvider();

  if (!provider) {
    setStatus(
      "Trust Wallet was not detected. Open this website in the Trust Wallet browser or install its browser extension.",
      "error"
    );
    return;
  }

  connectButton.disabled = true;
  connectButton.textContent = "Connecting...";
  setStatus("Please approve the connection in Trust Wallet.");

  try {
    const accounts = await provider.request({
      method: "eth_requestAccounts"
    });

    if (!accounts || accounts.length === 0) {
      throw new Error("No wallet account was returned.");
    }

    connectButton.textContent = "Connected";
    setStatus("Wallet connected successfully. Loading...", "success");

    // Continue with your website's authenticated experience here.
    // Do not send private keys or recovery phrases anywhere.

  } catch (error) {
    connectButton.disabled = false;
    connectButton.textContent = "Connect Trust Wallet";

    if (error.code === 4001) {
      setStatus("Connection request was rejected.", "error");
    } else {
      setStatus(
        error.message || "Unable to connect wallet. Please try again.",
        "error"
      );
    }
  }
});
