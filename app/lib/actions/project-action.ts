"use server";

import * as z from "zod";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadToCloudinary } from "../cloudinary";
import { ProjectSchema } from "../validations/project-schema";

export async function createProject(formData: FormData) {
    const validatedFields = ProjectSchema.omit({
        image: true
    }).safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        githubUrl: formData.get("githubUrl"),
        liveUrl: formData.get("liveUrl"),
    });

    if (!validatedFields.success) {
        throw new Error("Validation failed");
    }

    const image = formData.get("image") as File | null;

    if (!image || image.size === 0) {
        throw new Error("Please select an image");
    }

    if (image.size > 200 * 1024) {
        throw new Error("Image must be less than 200KB");
    }

    let featured = false;
    if (formData.get("featured") === "true") {
        featured = true
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploaded = await uploadToCloudinary(buffer, "developer-portfolio/projects/images");

    const { title, slug, description, githubUrl, liveUrl } = validatedFields.data;
    try {
        await prisma.project.create({
            data: {
                title,
                slug,
                description,
                githubUrl,
                liveUrl,
                featured,
                projectImg: {
                    create: {
                        imageUrl: uploaded.imageUrl,
                        cloudinaryPublicId: uploaded.cloudinaryPublicId,
                        imageName: image.name,
                    },
                },
            }
        });
    } catch (error) {
        console.error(error);
        return {
            message: "Database Error: Failed to create project.",
        };
    }
    revalidatePath('/admin/projects');
    redirect('/admin/projects');
}

export async function updateProject(formData: FormData) {
    const validatedFields = ProjectSchema.omit({
        image: true
    }).safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        githubUrl: formData.get("githubUrl"),
        liveUrl: formData.get("liveUrl"),
    });

    if (!validatedFields.success) {
        throw new Error("Validation failed");
    }

    const image = formData.get("image") as File | null;

    if (!image || image.size === 0) {
        throw new Error("Please select an image");
    }

    if (image.size > 200 * 1024) {
        throw new Error("Image must be less than 200KB");
    }

    let featured = false;
    if (formData.get("featured") === "true") {
        featured = true
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploaded = await uploadToCloudinary(buffer, "developer-portfolio/projects/images")
}


// "use server";

// import * as z from "zod";
// import { prisma } from "../prisma";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { uploadToCloudinary } from "../cloudinary";

// const optionalUrl = z.preprocess(
//     (value) => value === "" ? undefined : value,
//     z.url().optional()
// );

// const ProjectForm = z.object({
//     id: z.string(),
//     title: z.string().min(3, "Title must be at least 3 characters"),
//     slug: z.string().min(3, "Slug must be at least 3 characters"),
//     description: z.string().min(10, "Description must be at least 10 characters"),
//     githubUrl: optionalUrl,
//     liveUrl: optionalUrl,
//     featured: z.enum(["true", "false"]).transform(
//         (value) => value === "true"
//     ),
//     // featured: z.boolean(),
//     // featured: z.coerce.boolean(),
// })

// export type State = {
//     values?: {
//         title?: string;
//         slug?: string;
//         description?: string;
//         githubUrl?: string;
//         liveUrl?: string;
//         featured?: string;
//     };
//     errors?: {
//         title?: string[];
//         slug?: string[];
//         description?: string[];
//         githubUrl?: string[],
//         liveUrl?: string[],
//         featured?: string[],
//         image?: string[],
//     };
//     message?: string | null;
// }

// const CreateProject = ProjectForm.omit({ id: true });

// export async function createProject(prevState: State, formData: FormData): Promise<State> {
//     const validatedFields = CreateProject.safeParse({
//         title: formData.get("title"),
//         slug: formData.get("slug"),
//         description: formData.get("description"),
//         githubUrl: formData.get("githubUrl"),
//         liveUrl: formData.get("liveUrl"),
//         featured: formData.get("featured"),
//     });

//     if (!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: "Missing fields. Failed to create project.",
//         }
//     }

//     const image = formData.get("image") as File | null;
//     if (!image || image.size === 0) {
//         return {
//             errors: {
//                 image: ["Please select an image"]
//             }
//         };
//     }
//     if (image.size > 200 * 1024) {
//         return {
//             errors: {
//                 image: ["Image must be less than 200KB"]
//             }
//         };
//     }
//     const bytes = await image.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const uploaded = await uploadToCloudinary(buffer, "developer-portfolio/projects/images");

//     const { title, slug, description, githubUrl, liveUrl, featured } = validatedFields.data;
//     // let uploaded: any = "";
//     // if (image && image.size > 0) {
//     //     const bytes = await image.arrayBuffer();
//     //     const buffer = Buffer.from(bytes);

//     //     uploaded = await uploadToCloudinary(buffer, "projects/images");

//     //     // imageUrl = uploaded.imageUrl;
//     // }
//     try {
//         await prisma.project.create({
//             data: {
//                 title,
//                 slug,
//                 description,
//                 githubUrl,
//                 liveUrl,
//                 featured,
//                 projectImg: {
//                     create: {
//                         imageUrl: uploaded.imageUrl,
//                         cloudinaryPublicId: uploaded.cloudinaryPublicId,
//                         imageName: image.name,
//                     },
//                 },
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         return {
//             message: "Database Error: Failed to create project.",
//         };
//     }
//     revalidatePath('/admin/projects');
//     redirect('/admin/projects');
// }