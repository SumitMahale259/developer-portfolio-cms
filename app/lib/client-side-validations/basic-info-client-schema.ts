"use client";

import * as z from "zod";
import { BasicInfoSchema } from "../validations/about-schema";

const IMAGE_SIZE = 200 * 1024;
const SUPPORTED_FORMATS_IMAGE = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FileListSchema = z.custom<FileList>(
  (value) =>
  typeof window === "undefined" || value instanceof FileList,
  "Expected FileList"
);

export const BasicInfoClientSchema = BasicInfoSchema.extend({
  profileImg: FileListSchema
    .optional()
    .transform((files) => {
      if (!files || files.length === 0) return undefined;
      return files[0];
    })
    .refine(
      (file) => !file || file.size <= IMAGE_SIZE,
      "Image must be less than 200KB"
    )
    .refine(
      (file) => !file || SUPPORTED_FORMATS_IMAGE.includes(file.type),
      "Unsupported file format"
    ),
});

export type BasicInfoClientFormInput = z.input<typeof BasicInfoClientSchema>;
export type BasicInfoClientFormOutput = z.output<typeof BasicInfoClientSchema>;