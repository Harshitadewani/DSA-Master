const Progress = require("../models/Progress");
const Problem = require("../models/Problem");
const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

const toggleProblemStatus = asyncHandler(async (req, res) => {
  const { problemId } = req.body;
  if (!problemId) {
    throw new ApiError(400, "Problem ID is required");
  }

  let progress = await Progress.findOne({ user: req.user._id, problem: problemId });

  if (!progress) {
    progress = await Progress.create({
      user: req.user._id,
      problem: problemId,
      status: "Solved",
    });
  } else {
    progress.status = progress.status === "Solved" ? "Unsolved" : "Solved";
    await progress.save();
  }

  res.json(apiResponse("Status toggled", { status: progress.status }));
});

module.exports = { toggleProblemStatus };
