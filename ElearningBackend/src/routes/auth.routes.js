import express from "express";
import {
  signup,
  login,
  getMe,
  logout
} from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";
import { signupSchema, loginSchema } from "../validators/auth.schema.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, getMe);

export default router;
