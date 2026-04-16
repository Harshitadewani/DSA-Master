const connectDatabase = require("../config/db");
const Problem = require("../models/Problem");
const problems = require("../data/problems");

async function seed() {
  await connectDatabase();
  await Problem.deleteMany({});
  await Problem.insertMany(problems);
  // eslint-disable-next-line no-console
  console.log("Problems seeded successfully");
  process.exit(0);
}

seed().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Seed failed:", error.message);
  process.exit(1);
});
