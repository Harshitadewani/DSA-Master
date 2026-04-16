const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
    },
    expectedOutput: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    tags: [{ type: String, trim: true }],
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    track: {
      type: String,
      enum: ["Basic", "Intermediate", "Hard"],
      required: true,
    },
    starterCode: {
      javascript: { type: String, default: "" },
      cpp: { type: String, default: "" },
      java: { type: String, default: "" },
      python: { type: String, default: "" },
    },
    sampleTestCases: [testCaseSchema],
    hiddenTestCases: [testCaseSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);
