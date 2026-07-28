import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createCheckoutSession } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/checkout", authMiddleware, createCheckoutSession);

export default router;
