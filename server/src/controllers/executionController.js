const Problem = require("../models/Problem");
const Progress = require("../models/Progress");
const Submission = require("../models/Submission");
const User = require("../models/User");
const ApiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { executeCode } = require("../services/executionService");
const { updateStreak } = require("../services/streakService");
const { sendBadgeEmail } = require("../services/mailService");

function estimateComplexity(executionTimeMs, totalTests) {
  if (executionTimeMs <= 8 && totalTests >= 2) return "Likely O(n)";
  if (executionTimeMs <= 20) return "Likely O(n log n)";
  return "Likely O(n^2) or higher";
}

async function calculatePeopleBeaten(problemId, executionTimeMs) {
  const acceptedSubs = await Submission.find({
    problem: problemId,
    type: "SUBMIT",
    status: "Accepted",
  }).select("executionTimeMs");

  if (!acceptedSubs.length) return 100;

  const slowerCount = acceptedSubs.filter(
    (submission) => submission.executionTimeMs > executionTimeMs
  ).length;
  return Number(((slowerCount / acceptedSubs.length) * 100).toFixed(1));
}

async function handleExecution(req, res, mode) {
  const { slug, code, language } = req.body;
  if (!slug || !code || !language) {
    throw new ApiError(400, "slug, code, and language are required");
  }

  const problem = await Problem.findOne({ slug });
  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  const testCases = mode === "RUN" ? problem.sampleTestCases : problem.hiddenTestCases;
  const result = await executeCode({ 
    code, 
    language, 
    testCases,
    problemTitle: problem.title,
    problemDescription: problem.description
  });

  const submission = await Submission.create({
    user: req.user._id,
    problem: problem._id,
    language,
    code,
    type: mode,
    status: result.status,
    executionTimeMs: result.executionTimeMs,
    memoryUsageKb: result.memoryUsageKb,
    stdout: result.stdout,
    stderr: result.stderr,
    testResults: result.testResults,
  });

  let progress = await Progress.findOne({ user: req.user._id, problem: problem._id });
  if (!progress) {
    progress = await Progress.create({
      user: req.user._id,
      problem: problem._id,
      status: "Unsolved",
      attemptsCount: 0,
    });
  }

  progress.attemptsCount += 1;
  let updatedUser = null;

  if (result.status === "Accepted" && mode.toUpperCase() === "SUBMIT") {
    if (progress.status !== "Solved") {
      progress.status = "Solved";
      progress.solvedAt = new Date();

      const user = await User.findById(req.user._id);
      user.problemsSolved += 1;
      updateStreak(user);

      if (user.currentStreak >= 20) {
        const badgeCode = "CONSISTENCY_20";
        const hasBadge = user.badges.some((badge) => badge.code === badgeCode);
        if (!hasBadge) {
          user.badges.push({ code: badgeCode });
        }

        if (!user.badgeMailsSent.includes(badgeCode)) {
          await sendBadgeEmail({
            toEmail: user.email,
            name: user.name,
            badgeLabel: "20-Day Consistency Badge",
          });
          user.badgeMailsSent.push(badgeCode);
        }
      }

      await user.save();
      updatedUser = user;
    }
  } else if (progress.status === "Unsolved") {
    progress.status = "Attempted";
  }
  await progress.save();

  const complexity = estimateComplexity(result.executionTimeMs, testCases.length);
  const peopleBeatenPercent = await calculatePeopleBeaten(problem._id, result.executionTimeMs);

  res.json(
    apiResponse(`${mode} completed`, {
      submissionId: submission._id,
      ...result,
      progressStatus: progress.status,
      complexity,
      peopleBeatenPercent,
      user: updatedUser ? {
        problemsSolved: updatedUser.problemsSolved,
        currentStreak: updatedUser.currentStreak,
        longestStreak: updatedUser.longestStreak,
      } : null
    })
  );
}

const runCode = asyncHandler(async (req, res) => handleExecution(req, res, "RUN"));
const submitCode = asyncHandler(async (req, res) => handleExecution(req, res, "SUBMIT"));

module.exports = { runCode, submitCode };
