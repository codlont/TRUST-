
const SUPABASE_URL = "https://sitoqfxyzezvwrrooqra.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_wl2NsJaGHrO0M1wGmSos_g_oesRfGQi";

const connectButton = document.getElementById("connectButton");
const statusText = document.getElementById("status");
const nameInput = document.getElementById("nameInput");

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
      throw new Error(`Submission failed: HTTP ${response.status}`);
    }

    statusText.textContent = "Success! Your name has been submitted.";
    nameInput.value = "";

  } catch (error) {
    console.error(error);
    statusText.textContent = "Submission failed. Please try again.";
  } finally {
    connectButton.disabled = false;
  }
});
