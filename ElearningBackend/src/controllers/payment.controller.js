
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import asyncHandler from "../utils/asyncHandler.js";
import stripe from "../config/stripe.js";

export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user._id;

  if (!courseId) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (course.price === 0) {
    return res.status(400).json({ message: "Course is free" });
  }

  const existing = await Enrollment.findOne({ userId, courseId });
  if (existing) {
    return res.status(400).json({ message: "Already enrolled" });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: req.user.email,

    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: course.title
          },
          unit_amount: course.price * 100 
        },
        quantity: 1
      }
    ],

    success_url: `${process.env.FRONTEND_URL}/payment-success?courseId=${courseId}`,
    cancel_url: `${process.env.FRONTEND_URL}/courses`
  });

  res.status(200).json({
    success: true,
    url: session.url
  });
});
