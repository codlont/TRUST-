
const SUPABASE_URL = "https://sitoqfxyzezvwrrooqra.supabase.co/rest/v1/";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_wl2NsJaGHrO0M1wGmSos_g_oesRfGQi";

const connectButton = document.getElementById("connectButton");
const statusText = document.getElementById("status");

connectButton.addEventListener("click", async function () {
  connectButton.disabled = true;
  statusText.textContent = "Checking backend connection...";

  try {
    const response = await fetch(
      `${SUPABASE_URL}/auth/v1/health`,
      {
        method: "GET",
        headers: {
          "apikey": SUPABASE_PUBLISHABLE_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error("Backend connection failed.");
    }

    statusText.textContent =
      "Backend connection successful. No wallet has been connected.";

  } catch (error) {
    statusText.textContent =
      "Backend connection failed. Please try again.";
  } finally {
    connectButton.disabled = false;
  }
});
