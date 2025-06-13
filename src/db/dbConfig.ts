import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Ensure that the environment variables are set
if (!process.env.MONGODB_URI || !process.env.MONGODB_DB_NAME) {
  throw new Error("MONGODB_URI or MONGODB_DB_NAME is not defined in the environment variables");
}

export async function connectToDatabase() {
  try {
    const uri = process.env.MONGODB_URI!.replace(/\/$/, ''); // Remove trailing slash if present
    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB_NAME
    });
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongoose connected to MongoDB");
    });
    connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

