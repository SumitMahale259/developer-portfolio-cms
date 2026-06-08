import * as z from "zod";

// const optionalUrl = z.preprocess(
//     (value) => value === "" ? undefined : value,
//     z.url().optional()
// );

// const fileSchema = z.file();

// fileSchema.min(10_000);
// fileSchema.max(1_000_000);
// fileSchema.mime("image/png");
// fileSchema.mime(["image/png", "image/jpeg"]);

const MAX_FILE_SIZE = 50000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const ProjectSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    // githubUrl: optionalUrl,
    // liveUrl: optionalUrl,
    githubUrl: z.union([z.url(), z.literal("")]),
    liveUrl: z.union([z.url(), z.literal("")]),
    featured: z.enum(["true", "false"]),
    image: z
    // .instanceof(FileList)
    // .refine((files) => files.length > 0, "Please select an image")
    // .transform((files) => files[0])
    // .any()
    // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    // .refine(
    //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //     "Only .jpg, .jpeg, .png and .webp formats are supported."
    // )
    .instanceof(File, {
        message: "Please select an image",
    })
    .refine(
        (file) => file.size <= 200 * 1024,
        "Image must be less than 200KB"
    ),
    // image: z
    // .any()
    // .transform((files) => files?.[0])
    // .refine((file) => file instanceof File, {
    //     message: "Please select an image",
    // })
    // .refine(
    //     (file) => file.size <= 200 * 1024,
    //     "Image must be less than 200KB"
    // ),
    // image: fileSchema,
})

export type ProjectFormData = z.infer<typeof ProjectSchema>;

// export type ProjectFormInput = z.input<typeof ProjectSchema>;
// export type ProjectFormOutput = z.output<typeof ProjectSchema>;