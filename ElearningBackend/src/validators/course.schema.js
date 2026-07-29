import { z } from "zod";

/* ===============================
   Lesson Validation
================================ */
const lessonSchema = z.object({
  title: z.string().trim().min(1, "Lesson title is required"),

  contentHtml: z.string().optional().default(""),

  videoUrl: z
    .string()
    .trim()
    .url("Invalid video URL")
    .optional()
    .or(z.literal("")),

  order: z.number().int().min(1),
});

/* ===============================
   Create Course
================================ */
export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3, "Title is required"),

    subtitle: z.string().trim().optional().default(""),

    description: z.string().trim().min(10, "Description is required"),

    faculty: z.string().trim().min(2, "Faculty name is required"),

    category: z.string().trim().min(2, "Category is required"),

    difficulty: z.enum(["beginner", "intermediate", "advanced"]),

    language: z.string().trim().optional().default("English"),

    duration: z.string().trim().optional().default(""),

    price: z.number().min(0).optional(),

    thumbnailUrl: z
      .string()
      .trim()
      .url("Invalid thumbnail URL")
      .optional()
      .or(z.literal("")),

    requirements: z.array(z.string().trim()).optional().default([]),

    learningOutcomes: z.array(z.string().trim()).optional().default([]),

    published: z.boolean().optional().default(false),

    lessons: z.array(lessonSchema).optional().default([]),
  }),
});

/* ===============================
   Update Course
================================ */
export const updateCourseSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).optional(),

    subtitle: z.string().trim().optional(),

    description: z.string().trim().min(10).optional(),

    faculty: z.string().trim().optional(),

    category: z.string().trim().optional(),

    difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),

    language: z.string().trim().optional(),

    duration: z.string().trim().optional(),

    price: z.number().min(0).optional(),

    thumbnailUrl: z
      .string()
      .trim()
      .url("Invalid thumbnail URL")
      .optional()
      .or(z.literal("")),

    requirements: z.array(z.string().trim()).optional(),

    learningOutcomes: z.array(z.string().trim()).optional(),

    published: z.boolean().optional(),

    lessons: z.array(lessonSchema).optional(),
  }),
});
