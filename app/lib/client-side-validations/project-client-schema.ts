"use client";

import * as z from "zod";
import { ProjectSchema } from "../validations/project-schema";

const IMAGE_SIZE = 200 * 1024;
const SUPPORTED_FORMATS_IMAGE = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ProjectClientSchema = ProjectSchema.extend({
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Please select an image")
    .transform((files) => files[0])
    .refine(
      (file) => file.size <= IMAGE_SIZE,
      "Image must be less than 200KB"
    )
    .refine(
      (file) => SUPPORTED_FORMATS_IMAGE.includes(file.type),
      "Unsupported file format"
    ),
});

export const ProjectEditClientSchema = ProjectSchema.extend({
  image: z
    .instanceof(FileList)
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

export type ProjectClientFormInput = z.input<typeof ProjectClientSchema>;
export type ProjectClientFormOutput = z.output<typeof ProjectClientSchema>;
export type ProjectClientEditFormInput = z.input<typeof ProjectEditClientSchema>;
export type ProjectClientEditFormOutput = z.output<typeof ProjectEditClientSchema>;