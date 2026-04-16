const express = require("express");
const { runCode, submitCode } = require("../controllers/executionController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/run", authMiddleware, runCode);
router.post("/submit", authMiddleware, submitCode);

module.exports = router;
