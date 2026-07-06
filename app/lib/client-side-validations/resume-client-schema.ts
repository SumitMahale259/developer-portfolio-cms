"use client";

import * as z from "zod";

const RESUME_SIZE = 300 * 1024;
const SUPPORTED_FORMAT_RESUME = [
  "application/pdf",
];

const FileListSchema = z.custom<FileList>(
  (value) =>
  typeof window === "undefined" || value instanceof FileList,
  "Expected FileList"
);

export const ResumeClientSchema = z.object({
  resume: FileListSchema
  .optional()
  .transform((files) => {
    if (!files || files.length === 0) return undefined;
    return files[0];
  })
  .refine(
    (file) => !file || file.size <= RESUME_SIZE,
    "Image must be less than 200KB"
  )
  .refine(
    (file) => !file || SUPPORTED_FORMAT_RESUME.includes(file.type),
    "Unsupported file format"
  ),
});

export type ResumeClientFormInput = z.input<typeof ResumeClientSchema>;
export type ResumeClientFormOutput = z.output<typeof ResumeClientSchema>;