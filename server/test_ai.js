const { askGemini } = require("./src/services/geminiService");
const env = require("./src/config/env");

async function test() {
  console.log("Testing Gemini with model:", env.geminiModel);
  try {
    const response = await askGemini({
      problemTitle: "Two Sum",
      problemDescription: "Find indices of two numbers that add up to target.",
      userCode: "function solve(nums, target) { return [0, 1]; }",
      prompt: "Is this code correct for Two Sum?"
    });
    console.log("Response Received successfully!");
    console.log("---");
    console.log(response);
    console.log("---");
    process.exit(0);
  } catch (error) {
    console.error("Test Failed!");
    console.error(error);
    process.exit(1);
  }
}

test();
