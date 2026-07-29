import express from "express";

import {
  generateCertificate,
  getMyCertificates,
  verifyCertificate,
  downloadCertificate,
} from "../controllers/certificate.controller.js";

import protect  from "../middleware/auth.middleware.js"

const router = express.Router();

/* ===========================================================
   Student Routes
=========================================================== */

// Generate certificate after completing a course
router.post("/:enrollmentId", protect, generateCertificate);

// Get all certificates of logged-in student
router.get("/me", protect, getMyCertificates);
router.get(
  "/download/:certificateId",
  protect,
  downloadCertificate
);



/* ===========================================================
   Public Verification
=========================================================== */

// Verify certificate using certificate ID
router.get("/verify/:certificateId", verifyCertificate);

export default router;
