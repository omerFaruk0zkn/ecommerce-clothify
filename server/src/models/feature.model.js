import mongoose from "mongoose";

const featureSchema = new mongoose.Schema(
  {
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Feature", featureSchema);
