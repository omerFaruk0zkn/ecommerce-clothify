import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) => {
      console.log(`Connected to MongoDB ${data.connection.host}`);
    })
    .catch((err) => {
      console.log("Failed connect to MongoDB", err);
      process.exit(1);
    });
};
