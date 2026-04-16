const mongoose = require("mongoose");
const env = require("../config/env");

async function fixIndex() {
  try {
    console.log("Connecting to:", env.mongoUri.replace(/:([^@]+)@/, ":****@")); // Hide password in logs
    await mongoose.connect(env.mongoUri);
    console.log("Connected to MongoDB");
    
    // We use a raw collection access to be sure we can drop the index even if not in schema
    const collection = mongoose.connection.collection("users");
    
    const indexes = await collection.indexes();
    console.log("Current indexes:", indexes.map(i => i.name));
    
    if (indexes.some(i => i.name === "username_1")) {
      await collection.dropIndex("username_1");
      console.log("Dropped index username_1 successfully");
    } else {
      console.log("Index username_1 not found among current indexes.");
    }
    
    console.log("Index fix operation completed.");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing index:", error);
    process.exit(1);
  }
}

fixIndex();
