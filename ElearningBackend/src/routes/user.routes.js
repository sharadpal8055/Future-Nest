import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.middleware.js";
import {
  getAllUsers,
  getProfile,
  updateProfile,
  changePassword,
  uploadAvatar,
  deleteAccount,
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
router.post("/avatar", authMiddleware, upload.single("avatar"), uploadAvatar);
router.delete(
  "/me",
  authMiddleware,
  deleteAccount
);

export default router;
