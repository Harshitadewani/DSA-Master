const jwt = require("jsonwebtoken");
const env = require("../config/env");
const User = require("../models/User");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    throw new ApiError(401, "Unauthorized: token missing");
  }

  const payload = jwt.verify(token, env.jwtSecret);
  const user = await User.findById(payload.userId).select("-password");

  if (!user) {
    throw new ApiError(401, "Unauthorized: user not found");
  }

  req.user = user;
  next();
});

module.exports = authMiddleware;
