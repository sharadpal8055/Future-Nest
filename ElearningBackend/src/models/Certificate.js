import mongoose from "mongoose";
import crypto from "crypto";

const certificateSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    instructor: {
      type: String,
      required: true,
      trim: true,
    },

    enrollment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
      unique: true,
    },

    certificateId: {
      type: String,
      unique: true,
      index: true,
    },

    completionDate: {
      type: Date,
      default: Date.now,
    },

    pdfUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

/* ---------------- Generate Certificate ID ---------------- */

certificateSchema.pre("validate", function (next) {
  if (!this.certificateId) {
    const random = crypto.randomBytes(3).toString("hex").toUpperCase();

    this.certificateId = `LMS-${new Date().getFullYear()}-${random}`;
  }
});

export default mongoose.model("Certificate", certificateSchema);
