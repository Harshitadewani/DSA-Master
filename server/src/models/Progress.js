const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["Unsolved", "Attempted", "Solved"],
      default: "Unsolved",
    },
    attemptsCount: {
      type: Number,
      default: 0,
    },
    solvedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

progressSchema.index({ user: 1, problem: 1 }, { unique: true });

module.exports = mongoose.model("Progress", progressSchema);
