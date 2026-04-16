const User = require("../models/User");
const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  
  // Real-time streak validation
  if (user.lastSolvedDate) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastSolved = new Date(user.lastSolvedDate);
    const lastMidnight = new Date(lastSolved.getFullYear(), lastSolved.getMonth(), lastSolved.getDate());
    
    const diffMs = today.getTime() - lastMidnight.getTime();
    const diffDays = Math.round(diffMs / (24 * 60 * 60 * 1000));
    
    // If more than 1 day has passed, the streak is broken
    if (diffDays > 1) {
      user.currentStreak = 0;
      await user.save();
    }
  }

  res.json(
    apiResponse("Profile fetched", {
      ...user.toObject(),
      has20DayBadge: user.badges.some((badge) => badge.code === "CONSISTENCY_20"),
    })
  );
});

module.exports = { getProfile };
