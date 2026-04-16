const Progress = require("../models/Progress");
const Problem = require("../models/Problem");
const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAnalytics = asyncHandler(async (req, res) => {
  const solvedProgress = await Progress.find({
    user: req.user._id,
    status: "Solved",
  }).populate("problem", "difficulty");

  const difficultyStats = {
    Easy: 0,
    Medium: 0,
    Hard: 0,
  };

  solvedProgress.forEach((entry) => {
    const difficulty = entry.problem?.difficulty;
    if (difficulty && difficultyStats[difficulty] !== undefined) {
      difficultyStats[difficulty] += 1;
    }
  });

  const totalProblems = await Problem.countDocuments();
  const solvedCount = solvedProgress.length;

  res.json(
    apiResponse("Analytics fetched", {
      difficultyStats,
      solvedCount,
      totalProblems,
      progressPercentage: totalProblems
        ? Number(((solvedCount / totalProblems) * 100).toFixed(2))
        : 0,
    })
  );
});

module.exports = { getAnalytics };
