import { z } from "zod";

const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  contentHtml: z.string().optional(),
  videoUrl: z.string().optional(),
  order: z.number()
});

export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),

    difficulty: z.enum(["beginner", "intermediate", "advanced"]),

    faculty: z.string().min(1, "Faculty name is required"),

    price: z.number().nonnegative().optional(),
    thumbnailUrl: z.string().url().optional(),

    lessons: z.array(lessonSchema).optional()
  })
});

export const updateCourseSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
    faculty: z.string().optional(),
    price: z.number().optional(),
    thumbnailUrl: z.string().url().optional(),
    lessons: z.array(lessonSchema).optional()
  })
});
