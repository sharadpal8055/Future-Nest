import express from "express";

import {
  enrollInCourse,
  enrollPaidCourse,        
  getMyEnrollments,
  updateProgress,
  getAllEnrollments
} from "../controllers/enrollment.controller.js";

import validate from "../middleware/validate.middleware.js";
import {
  enrollSchema,
  updateProgressSchema
} from "../validators/enrollment.schema.js";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validate(enrollSchema),
  enrollInCourse
);
router.post(
  "/paid",
  authMiddleware,
  validate(enrollSchema),
  enrollPaidCourse
);
router.get("/me", authMiddleware, getMyEnrollments);

router.put(
  "/:id/progress",
  authMiddleware,
  validate(updateProgressSchema),
  updateProgress
);
router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  getAllEnrollments
);

export default router;
