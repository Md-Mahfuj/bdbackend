import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    // Validate environment variables
    if (!mongoUri) {
      throw new Error("MONGODB_URI environment variable is not set.");
    }
    if (!DB_NAME) {
      throw new Error("DB_NAME environment variable is not set.");
    }

    // Attempt to connect to MongoDB
    const connectionInstance = await mongoose.connect(`${mongoUri}/${DB_NAME}`);

    console.log(
      `\nMongoDB connected successfully! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB connection FAILED: ", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
