const env = require("./src/config/env");

async function checkApi() {
  console.log("Checking API Key validity via fetch...");
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${env.geminiApiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
       console.log("API Key is VALID! Available models:");
       data.models.forEach(m => console.log(`- ${m.name}`));
    } else {
       console.error("API error status:", response.status);
       console.error(data);
    }
  } catch (error) {
    console.error("Fetch failed:", error.message);
  }
}

checkApi();
