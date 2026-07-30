import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import pdfUpload from "../middleware/pdfUpload.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  downloadNote,
} from "../controllers/note.controller.js";

const router = express.Router();

/* ===========================================================
                        STUDENT ROUTES
=========================================================== */

router.get("/", getNotes);

router.get("/:id", getNote);
router.get("/:id/download", downloadNote);

/* ===========================================================
                        ADMIN ROUTES
=========================================================== */

router.post(
  "/admin",
  authMiddleware,
  adminMiddleware,
  pdfUpload.single("pdf"),
  createNote
);

router.put(
  "/admin/:id",
  authMiddleware,
  adminMiddleware,
  pdfUpload.single("pdf"),
  updateNote
);

router.delete(
  "/admin/:id",
  authMiddleware,
  adminMiddleware,
  deleteNote
);

export default router;