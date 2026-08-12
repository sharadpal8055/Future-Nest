import { z } from "zod";

export const createResourceSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),

  url: z
    .string()
    .trim()
    .url("Please enter a valid URL")
    .refine(
      (url) => /^https?:\/\//i.test(url),
      "Only HTTP and HTTPS URLs are allowed"
    ),
});