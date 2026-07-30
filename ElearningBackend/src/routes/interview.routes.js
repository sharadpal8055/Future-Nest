import express from "express";
import {
  createQuestion,
  createSubject,
  deleteQuestion,
  deleteSubject,
  getQuestions,
  getSubjects,
  updateQuestion,
  updateSubject,
} from "../controllers/interview.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* ---------- Student ---------- */

router.get("/subjects", getSubjects);
router.get("/questions/:subjectId", getQuestions);

/* ---------- Admin ---------- */

router.post(
  "/admin/subject",
 authMiddleware,
  createSubject
);

router.put(
  "/admin/subject/:id",
 authMiddleware,
  updateSubject
);

router.delete(
  "/admin/subject/:id",
 authMiddleware,
  deleteSubject
);

router.post(
  "/admin/question",
authMiddleware,
  createQuestion
);

router.put(
  "/admin/question/:id",
 authMiddleware,
  updateQuestion
);

router.delete(
  "/admin/question/:id",
authMiddleware,
  deleteQuestion
);

export default router;