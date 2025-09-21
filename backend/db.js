import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI not set in .env");
  process.exit(1);
}

export default function connectDB() {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(MONGO_URI, {
      // options are not needed on latest mongoose, keep defaults
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.error("MongoDB connection error:", err.message);
      process.exit(1);
    });
}
