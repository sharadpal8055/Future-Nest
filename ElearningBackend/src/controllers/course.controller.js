import Course from "../models/Course.js";
import slugify from "slugify";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";

export const getCourses = asyncHandler(async (req, res) => {
  const { category, difficulty, price, search, page = 1, limit = 10 } = req.query;

  const query = {};
  if (category) query.category = category;
  if (difficulty) query.difficulty = difficulty;
  if (price === "free") query.price = 0;
  if (price === "paid") query.price = { $gt: 0 };
  if (search) query.title = { $regex: search, $options: "i" };

  const skip = (page - 1) * limit;

  const [courses, total] = await Promise.all([
    Course.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Course.countDocuments(query)
  ]);

  res.json({
    success: true,
    data: courses,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit)
    }
  });
});

export const getCourseById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404);
    throw new Error("Course not found");
  }

  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  res.json({ success: true, data: course });
});

export const createCourse = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    difficulty,
    faculty,
    price = 0,
    thumbnailUrl,
    lessons = []
  } = req.body;

  let slug = slugify(title, { lower: true });
  if (await Course.findOne({ slug })) {
    slug = `${slug}-${Date.now()}`;
  }

  const normalizedLessons = lessons.map((l, i) => ({
    title: l.title,
    contentHtml: l.contentHtml || "",
    videoUrl: l.videoUrl || "",
    order: l.order ?? i + 1
  }));

  const course = await Course.create({
    title,
    slug,
    description,
    category,
    difficulty,
    faculty,
    price,
    thumbnailUrl,
    lessons: normalizedLessons
  });

  res.status(201).json({ success: true, data: course });
});

export const updateCourse = asyncHandler(async (req, res) => {
  const updates = { ...req.body };

  if (updates.title) {
    let slug = slugify(updates.title, { lower: true });
    if (await Course.findOne({ slug, _id: { $ne: req.params.id } })) {
      slug = `${slug}-${Date.now()}`;
    }
    updates.slug = slug;
  }

  if (updates.lessons) {
    updates.lessons = updates.lessons.map((l, i) => ({
      title: l.title,
      contentHtml: l.contentHtml || "",
      videoUrl: l.videoUrl || "",
      order: l.order ?? i + 1
    }));
  }

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true, runValidators: true }
  );

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  res.json({ success: true, data: course });
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  res.json({ success: true, message: "Course deleted successfully" });
});
