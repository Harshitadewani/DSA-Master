const app = require("./app");
const env = require("./config/env");
const connectDatabase = require("./config/db");
const progressRoutes = require("./routes/progressRoutes");

app.use("/api/progress", progressRoutes);

async function bootstrap() {
  await connectDatabase();
  console.log("GEMINI_API_KEY loaded:", env.geminiApiKey ? `${env.geminiApiKey.slice(0, 8)}...${env.geminiApiKey.slice(-4)}` : "MISSING");
  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${env.port}`);
  });
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
