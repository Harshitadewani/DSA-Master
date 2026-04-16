const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function testModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  const modelsToTest = [
    { name: "gemini-1.5-flash", version: "v1" },
    { name: "gemini-1.5-flash", version: "v1beta" },
    { name: "gemini-pro", version: "v1" },
    { name: "gemini-pro", version: "v1beta" }
  ];

  for (const m of modelsToTest) {
    try {
      console.log(`Testing ${m.name} with ${m.version}...`);
      const model = genAI.getGenerativeModel({ model: m.name }, { apiVersion: m.version });
      const result = await model.generateContent("Hi");
      console.log(`✅ Success with ${m.name} (${m.version}): ${result.response.text().slice(0, 20)}`);
      break; 
    } catch (err) {
      console.log(`❌ Failed ${m.name} (${m.version}): ${err.message}`);
    }
  }
}

testModels();
