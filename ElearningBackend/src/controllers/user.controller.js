import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("name email role createdAt")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: users
  });
});



/**
 * GET /api/users/me
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-passwordHash");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * PUT /api/users/me
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    bio,
    phone,
    location,
    website,
    linkedin,
    github,
  } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Update email safely
  if (email && email !== user.email) {
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    user.email = email;
  }

  if (name !== undefined) user.name = name;
  if (bio !== undefined) user.bio = bio;
  if (phone !== undefined) user.phone = phone;
  if (location !== undefined) user.location = location;
  if (website !== undefined) user.website = website;
  if (linkedin !== undefined) user.linkedin = linkedin;
  if (github !== undefined) user.github = github;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: user,
  });
});

/**
 * PATCH /api/users/change-password
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select("+passwordHash");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(
    currentPassword,
    user.passwordHash
  );

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Current password is incorrect",
    });
  }

  const samePassword = await bcrypt.compare(
    newPassword,
    user.passwordHash
  );

  if (samePassword) {
    return res.status(400).json({
      success: false,
      message: "New password must be different from current password",
    });
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});