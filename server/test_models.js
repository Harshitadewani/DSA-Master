const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = require("./src/config/env");

async function listModels() {
  console.log("Fetching available models...");
  const genAI = new GoogleGenerativeAI(env.geminiApiKey);
  try {
    // There isn't a direct listModels in the simple SDK usually via genAI
    // But we can try to use gemini-1.5-flash with v1 and see if it works with different config
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hi");
    console.log("Success with gemini-1.5-flash!");
    console.log(result.response.text());
  } catch (error) {
    console.log("Failed with gemini-1.5-flash, trying gemini-1.5-pro...");
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent("Hi");
      console.log("Success with gemini-1.5-pro!");
      console.log(result.response.text());
    } catch (err2) {
      console.log("Failed with gemini-1.5-pro as well.");
      console.error(err2);
    }
  }
}

listModels();
