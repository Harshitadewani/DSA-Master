const Problem = require("../models/Problem");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const { askGemini } = require("../services/geminiService");

const askAssistant = asyncHandler(async (req, res) => {
  const { slug, userCode, prompt } = req.body;

  if (!slug || !prompt) {
    throw new ApiError(400, "slug and prompt are required");
  }

  const problem = await Problem.findOne({ slug });
  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  try {
    const reply = await askGemini({
      problemTitle: problem.title,
      problemDescription: problem.description,
      userCode: userCode || "",
      prompt,
    });
    res.json(apiResponse("Assistant reply generated", { reply }));
  } catch (error) {
    // Pass the actual error message down for debugging
    throw new ApiError(error.statusCode || 500, error.message || "AI request failed");
  }
});

module.exports = { askAssistant };
