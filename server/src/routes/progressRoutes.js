const express = require("express");
const { toggleProblemStatus } = require("../controllers/progressController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/toggle", authMiddleware, toggleProblemStatus);

module.exports = router;
