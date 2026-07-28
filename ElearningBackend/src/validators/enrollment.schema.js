import { z } from "zod";

/* ===============================
   FREE COURSE ENROLLMENT
================================ */
export const enrollSchema = z.object({
  body: z.object({
    courseId: z.string().min(1, "Course ID is required")
  })
});

/* ===============================
   PAID COURSE ENROLLMENT
================================ */
export const enrollPaidSchema = z.object({
  body: z.object({
    courseId: z.string().min(1, "Course ID is required"),
    sessionId: z.string().min(1, "Payment session required")
  })
});

/* ===============================
   PROGRESS UPDATE
================================ */
export const updateProgressSchema = z.object({
  body: z.object({
    lessonId: z.string().min(1),
    completed: z.boolean()
  })
});
