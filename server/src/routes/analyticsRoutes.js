const express = require("express");
const { getAnalytics } = require("../controllers/analyticsController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getAnalytics);

module.exports = router;
