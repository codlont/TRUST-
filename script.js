
const SUPABASE_URL = "https://sitoqfxyzezvwrrooqra.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_wl2NsJaGHrO0M1wGmSos_g_oesRfGQi";

const connectButton = document.getElementById("connectButton");
const statusText = document.getElementById("status");

connectButton.addEventListener("click", async function () {
  connectButton.disabled = true;
  statusText.textContent = "Checking backend connection...";

  try {
    const baseUrl = SUPABASE_URL.replace(/\/+$/, "");

    const response = await fetch(`${baseUrl}/auth/v1/health`, {
      method: "GET",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY
      }
    });

    const result = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${result.slice(0, 250)}`);
    }

    statusText.textContent = "Backend connection successful.";

  } catch (error) {
    console.error("Supabase connection error:", error);
    statusText.textContent = `Connection error: ${error.message}`;
  } finally {
    connectButton.disabled = false;
  }
});
