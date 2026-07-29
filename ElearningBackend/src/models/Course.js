import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    contentHtml: {
      type: String,
      default: "",
    },

    videoUrl: {
      type: String,
      default: "",
      match: [/^https?:\/\/.+/, "Invalid video URL"],
    },

    order: {
      type: Number,
      required: true,
      min: 1,
    },
  },
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      trim: true,
      default: "",
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    faculty: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    language: {
      type: String,
      default: "English",
      trim: true,
    },

    duration: {
      type: String,
      default: "",
      trim: true,
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    thumbnailUrl: {
      type: String,
      default: "",
    },

    requirements: {
      type: [String],
      default: [],
    },

    learningOutcomes: {
      type: [String],
      default: [],
    },

    published: {
      type: Boolean,
      default: false,
    },

    enrollmentCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    lessons: {
      type: [lessonSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);