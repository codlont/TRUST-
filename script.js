
const SUPABASE_URL = "https://sitoqfxyzezvwrrooqra.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_wl2NsJaGHrO0M1wGmSos_g_oesRfGQi";

const connectButton = document.getElementById("connectButton");
const statusText = document.getElementById("status");
const nameInput = document.getElementById("nameInput");

function showLoadingScreen() {
  const screen = document.createElement("div");

  screen.innerHTML = `
    <div style="text-align:center;font-family:Arial,sans-serif;">
      <div class="loading-spinner"></div>
      <h2>Account Connecting...</h2>
      <p>Processing your submission...</p>
    </div>
  `;

  Object.assign(screen.style, {
    position: "fixed",
    inset: "0",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    zIndex: "99999"
  });

  const style = document.createElement("style");
  style.textContent = `
    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 5px solid #e5edf7;
      border-top: 5px solid #3375BB;
      border-radius: 50%;
      margin: auto auto 25px;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(screen);
}

connectButton.addEventListener("click", async function () {
  const name = nameInput.value.trim();

  if (!name) {
    statusText.textContent = "Please enter your name.";
    return;
  }

  if (name.length > 80) {
    statusText.textContent = "Name must be 80 characters or fewer.";
    return;
  }

  connectButton.disabled = true;
  statusText.textContent = "Submitting...";

  try {
    const response = await fetch(
      `${SUPABASE_URL.replace(/\/+$/, "")}/rest/v1/name_submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_PUBLISHABLE_KEY,
          "Authorization": `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({ name })
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `Submission failed: HTTP ${response.status} - ${errorDetails}`
      );
    }

    nameInput.value = "";
    showLoadingScreen();

  } catch (error) {
    console.error("Supabase submission error:", error);
    statusText.textContent = error.message;
  } finally {
    connectButton.disabled = false;
  }
});
