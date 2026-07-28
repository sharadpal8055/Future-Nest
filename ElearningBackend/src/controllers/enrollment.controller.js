import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import asyncHandler from "../utils/asyncHandler.js";

export const enrollInCourse = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (course.price > 0) {
    return res.status(403).json({
      message: "Payment required for this course"
    });
  }

  try {
    const enrollment = await Enrollment.create({
      userId,
      courseId,
      progress: {},
      isPaid: false
    });

    res.status(201).json({
      success: true,
      data: enrollment
    });
  } catch (err) {

    if (err.code === 11000) {
      return res.status(400).json({ message: "Already enrolled" });
    }
    throw err;
  }
});


export const enrollPaidCourse = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { courseId } = req.body;

  const course = await Course.findById(courseId);
  if (!course || course.price === 0) {
    return res.status(400).json({
      message: "Invalid paid course"
    });
  }

  try {
    const enrollment = await Enrollment.create({
      userId,
      courseId,
      progress: {},
      isPaid: true
    });

    res.status(201).json({
      success: true,
      data: enrollment
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already enrolled" });
    }
    throw err;
  }
});



export const getMyEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({ userId: req.user._id })
    .populate({
      path: "courseId",
      select:
        "title description lessons category difficulty thumbnailUrl price"
    });

  res.status(200).json({
    success: true,
    data: enrollments.filter(e => e.courseId)
  });
});

export const getAllEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find()
    .populate("userId", "name email")
    .populate("courseId", "title")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: enrollments
  });
});

export const updateProgress = asyncHandler(async (req, res) => {
  const { lessonId, completed } = req.body;

  if (!lessonId || typeof completed !== "boolean") {
    return res.status(400).json({
      message: "lessonId and completed(boolean) required"
    });
  }

  const enrollment = await Enrollment.findById(req.params.id);
  if (!enrollment) {
    return res.status(404).json({ message: "Enrollment not found" });
  }

  if (enrollment.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const course = await Course.findById(enrollment.courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const isPaidEnrollment =
    course.price === 0 || enrollment.isPaid === true;

  if (!isPaidEnrollment) {
    return res.status(403).json({
      message: "Payment verification required"
    });
  }

  const validLesson = course.lessons.some(
    l => l._id.toString() === lessonId
  );

  if (!validLesson) {
    return res.status(400).json({ message: "Invalid lesson" });
  }

  // ✅ ATOMIC UPDATE — NO CASTING, NO SAVE()
  await Enrollment.updateOne(
    { _id: enrollment._id },
    { $set: { [`progress.${lessonId}`]: completed } }
  );

  res.status(200).json({
    success: true,
    message: "Progress updated"
  });
});


