
const SUPABASE_URL = "https://sitoqfxyzezvwrrooqra.supabase.co/rest/v1/";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_wl2NsJaGHrO0M1wGmSos_g_oesRfGQi";

const nameInput = document.getElementById("nameInput");
const submitButton = document.getElementById("submitButton");
const statusText = document.getElementById("status");

submitButton.addEventListener("click", async function () {
  const name = nameInput.value.trim();

  if (!name) {
    statusText.textContent = "Please enter your name.";
    return;
  }

  if (name.length > 80) {
    statusText.textContent = "Your name must be 80 characters or fewer.";
    return;
  }

  submitButton.disabled = true;
  statusText.textContent = "Submitting...";

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/name_submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_PUBLISHABLE_KEY,
          "Authorization": `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({ name: name })
      }
    );

    if (!response.ok) {
      throw new Error("Submission failed.");
    }

    statusText.textContent = "Your name has been submitted successfully.";
    nameInput.value = "";

  } catch (error) {
    statusText.textContent = "Could not submit your name. Please try again.";
  } finally {
    submitButton.disabled = false;
  }
});
