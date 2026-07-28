import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("name email role createdAt")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: users
  });
});
