import express from "express";
import adminMiddleware from "../middleware/admin.middleware.js";
import {
  // Student
  getSubjects,
  getQuestions,
  getQuestion,

  // Admin
  createSubject,
  updateSubject,
  deleteSubject,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/interview.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* ============================================================
                        STUDENT ROUTES
============================================================ */

router.get("/subjects", getSubjects);

router.get("/questions/:subjectId", getQuestions);

// NEW: Get single question with answer
router.get("/question/:id", getQuestion);

/* ============================================================
                        ADMIN ROUTES
============================================================ */

router.post(
  "/admin/subject",
  authMiddleware,
  adminMiddleware,
  createSubject
);

router.put(
  "/admin/subject/:id",
  authMiddleware,
  adminMiddleware,
  updateSubject
);

router.delete(
  "/admin/subject/:id",
  authMiddleware,
  adminMiddleware,
  deleteSubject
);

router.post(
  "/admin/question",
  authMiddleware,
  adminMiddleware,
  createQuestion
);

router.put(
  "/admin/question/:id",
  authMiddleware,
  adminMiddleware,
  updateQuestion
);

router.delete(
  "/admin/question/:id",
  authMiddleware,
  adminMiddleware,
  deleteQuestion
);

export default router;
