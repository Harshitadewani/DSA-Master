const express = require("express");
const { askAssistant } = require("../controllers/aiController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/ask", authMiddleware, askAssistant);

module.exports = router;
