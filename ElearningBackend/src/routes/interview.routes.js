import express from "express";

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

router.post("/admin/subject", authMiddleware, createSubject);

router.put("/admin/subject/:id", authMiddleware, updateSubject);

router.delete("/admin/subject/:id", authMiddleware, deleteSubject);

router.post("/admin/question", authMiddleware, createQuestion);

router.put("/admin/question/:id", authMiddleware, updateQuestion);

router.delete("/admin/question/:id", authMiddleware, deleteQuestion);

export default router;
