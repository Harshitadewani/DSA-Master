const User = require("../models/User");
const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  
  // Real-time streak validation
  if (user.lastSolvedDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastSolved = new Date(user.lastSolvedDate);
    lastSolved.setHours(0, 0, 0, 0);
    
    const oneDayMs = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((today - lastSolved) / oneDayMs);
    
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
