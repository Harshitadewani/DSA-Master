const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
     // This is the only way to check what models the key actually has access to
     const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
     const data = await response.json();
     console.log("Models Available:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.log("Error listing models:", err.message);
  }
}

listModels();
