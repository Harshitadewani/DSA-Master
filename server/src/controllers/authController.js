const bcrypt = require("bcryptjs");
const User = require("../models/User");
const ApiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { signToken } = require("../services/jwtService");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email, and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = signToken(user._id);
  const safeUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    problemsSolved: user.problemsSolved,
    currentStreak: user.currentStreak,
    longestStreak: user.longestStreak,
  };

  res.status(201).json(apiResponse("Registration successful", { token, user: safeUser }));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signToken(user._id);
  const safeUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    problemsSolved: user.problemsSolved,
    currentStreak: user.currentStreak,
    longestStreak: user.longestStreak,
  };

  res.json(apiResponse("Login successful", { token, user: safeUser }));
});

module.exports = { register, login };
