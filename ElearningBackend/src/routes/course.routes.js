import express from "express";

import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadCourseThumbnail,
} from "../controllers/course.controller.js";

import validate from "../middleware/validate.middleware.js";

import {
  createCourseSchema,
  updateCourseSchema,
} from "../validators/course.schema.js";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

/* ===========================
   Public Routes
=========================== */

router.get("/", getCourses);

router.get("/:id", getCourseById);

/* ===========================
   Upload Course Thumbnail
=========================== */

router.post(
  "/upload-thumbnail",
  authMiddleware,
  adminMiddleware,
  upload.single("thumbnail"),
  uploadCourseThumbnail
);

/* ===========================
   Admin Routes
=========================== */

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createCourseSchema),
  createCourse
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateCourseSchema),
  updateCourse
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteCourse
);

export default router;