import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    url: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2048,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resource", resourceSchema);