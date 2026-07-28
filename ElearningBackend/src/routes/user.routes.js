import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

import {
  getAllUsers,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/user.controller.js";

import { changePasswordSchema } from "../validators/user.schema.js";
import validate from "../middleware/validate.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getAllUsers);

router.get("/me", authMiddleware, getProfile);

router.put("/me", authMiddleware, updateProfile);
router.patch(
  "/change-password",
  authMiddleware,
  validate(changePasswordSchema),
  changePassword,
);

export default router;
