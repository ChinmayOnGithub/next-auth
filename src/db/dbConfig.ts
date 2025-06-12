import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// Ensure that the environment variable is set
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}

export async function connectToDatabase() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
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
