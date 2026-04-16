const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const env = require("./config/env");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const problemRoutes = require("./routes/problemRoutes");
const executionRoutes = require("./routes/executionRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server running" });
});

app.get("/api/test-env", (req, res) => {
  res.json({ 
    success: true, 
    port: env.port, 
    hasKey: !!env.geminiApiKey,
    keyPrefix: env.geminiApiKey ? env.geminiApiKey.slice(0, 8) : null
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/execution", executionRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ai", aiRoutes);

app.use(errorHandler);

module.exports = app;
