// scripts/test-db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas successfully!");
    await mongoose.connection.close();
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
}

run();