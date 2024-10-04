const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    // Validate environment variables
    if (!mongoUri) {
      throw new Error("MONGODB_URI environment variable is not set.");
    }

    // Attempt to connect to MongoDB
    const connectionInstance = await mongoose.connect(`${mongoUri}/bdcalling`);

    console.log(
      `\nMongoDB connected successfully! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB connection FAILED: ", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB; // Use CommonJS export
