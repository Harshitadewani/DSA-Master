const Problem = require("../models/Problem");
const Progress = require("../models/Progress");
const ApiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getProblems = asyncHandler(async (req, res) => {
  const { difficulty, tag, status, track, topic } = req.query;
  const query = {};

  if (difficulty) query.difficulty = difficulty;
  if (tag) query.tags = tag;
  if (track) query.track = track;
  if (topic) query.topic = topic;

  const problems = await Problem.find(query).sort({ createdAt: -1 });
  const progressList = await Progress.find({ user: req.user._id }).lean();
  const progressMap = new Map(
    progressList.map((progress) => [String(progress.problem), progress.status])
  );

  let merged = problems.map((problem) => ({
    ...problem.toObject(),
    userStatus: progressMap.get(String(problem._id)) || "Unsolved",
  }));

  if (status) {
    merged = merged.filter((problem) => problem.userStatus === status);
  }

  res.json(apiResponse("Problems fetched", merged));
});

const getLibrary = asyncHandler(async (req, res) => {
  const problems = await Problem.find({})
    .select("title slug difficulty track topic tags")
    .sort({ topic: 1, createdAt: 1 })
    .lean();

  const library = {};
  for (const problem of problems) {
    if (!library[problem.topic]) {
      library[problem.topic] = {
        topic: problem.topic,
        total: 0,
        problems: [],
      };
    }

    library[problem.topic].total += 1;
    library[problem.topic].problems.push(problem);
  }

  res.json(apiResponse("Problem library fetched", Object.values(library)));
});

const getProblemBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const problem = await Problem.findOne({ slug });
  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  const progress = await Progress.findOne({ user: req.user._id, problem: problem._id });
  const userStatus = progress?.status || "Unsolved";

  res.json(apiResponse("Problem fetched", { ...problem.toObject(), userStatus }));
});

module.exports = { getProblems, getProblemBySlug, getLibrary };
