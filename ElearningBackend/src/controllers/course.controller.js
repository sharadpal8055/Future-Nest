import Course from "../models/Course.js";
import slugify from "slugify";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";

/* ===========================
   Get All Courses
=========================== */
export const getCourses = asyncHandler(async (req, res) => {
  const {
    category,
    difficulty,
    price,
    search,
    published,
    page = 1,
    limit = 10,
  } = req.query;

  const query = {};

  if (category) query.category = category;
  if (difficulty) query.difficulty = difficulty;

  if (published !== undefined) {
    query.published = published === "true";
  }

  if (price === "free") query.price = 0;
  if (price === "paid") query.price = { $gt: 0 };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { subtitle: { $regex: search, $options: "i" } },
      { faculty: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [courses, total] = await Promise.all([
    Course.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Course.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: courses,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

/* ===========================
   Get Course By ID
=========================== */
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

  res.json({
    success: true,
    data: course,
  });
});

/* ===========================
   Create Course
=========================== */
export const createCourse = asyncHandler(async (req, res) => {
  const {
    title,
    subtitle = "",
    description,
    faculty,
    category,
    difficulty,
    language = "English",
    duration = "",
    price = 0,
    thumbnailUrl = "",
    requirements = [],
    learningOutcomes = [],
    published = false,
    lessons = [],
  } = req.body;

  let slug = slugify(title, {
    lower: true,
    strict: true,
  });

  if (await Course.findOne({ slug })) {
    slug = `${slug}-${Date.now()}`;
  }

  const normalizedLessons = lessons.map((lesson, index) => ({
    title: lesson.title,
    contentHtml: lesson.contentHtml || "",
    videoUrl: lesson.videoUrl || "",
    order: lesson.order ?? index + 1,
  }));

  const course = await Course.create({
    title,
    subtitle,
    slug,
    description,
    faculty,
    category,
    difficulty,
    language,
    duration,
    price,
    thumbnailUrl,
    requirements,
    learningOutcomes,
    published,
    lessons: normalizedLessons,
  });

  res.status(201).json({
    success: true,
    data: course,
  });
});

/* ===========================
   Update Course
=========================== */
export const updateCourse = asyncHandler(async (req, res) => {
  const updates = { ...req.body };

  if (updates.title) {
    let slug = slugify(updates.title, {
      lower: true,
      strict: true,
    });

    const existing = await Course.findOne({
      slug,
      _id: { $ne: req.params.id },
    });

    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    updates.slug = slug;
  }

  if (updates.lessons) {
    updates.lessons = updates.lessons.map((lesson, index) => ({
      title: lesson.title,
      contentHtml: lesson.contentHtml || "",
      videoUrl: lesson.videoUrl || "",
      order: lesson.order ?? index + 1,
    }));
  }

  const course = await Course.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  res.json({
    success: true,
    data: course,
  });
});

/* ===========================
   Delete Course
=========================== */
export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  res.json({
    success: true,
    message: "Course deleted successfully",
  });
});
