const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    language: {
      type: String,
      enum: ["javascript", "cpp", "java", "python"],
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["RUN", "SUBMIT"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Accepted", "Failed", "Error"],
      required: true,
    },
    executionTimeMs: {
      type: Number,
      default: 0,
    },
    memoryUsageKb: {
      type: Number,
      default: 0,
    },
    stdout: {
      type: String,
      default: "",
    },
    stderr: {
      type: String,
      default: "",
    },
    testResults: [
      {
        input: String,
        expectedOutput: String,
        actualOutput: String,
        passed: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);
