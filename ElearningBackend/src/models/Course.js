import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  contentHtml: {
    type: String,
    default: ""
  },
  videoUrl: {
    type: String,
    default: "",
    match: [/^https?:\/\/.+/, "Invalid video URL"]
  },
  order: {
    type: Number,
    required: true,
    min: 1
  }
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    faculty: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true
    },
    price: {
      type: Number,
      min: 0,
      default: 0
    },
    thumbnailUrl: {
      type: String,
      default: ""
    },
    lessons: {
      type: [lessonSchema],
      default: []
    }
  },
  { timestamps: true }
);

courseSchema.index({ slug: 1 }, { unique: true });

export default mongoose.model("Course", courseSchema);
