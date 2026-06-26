"use server"

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteFromCloudinary, uploadToCloudinary } from "../cloudinary";
import { ProjectSchema } from "../validations/project-schema";
import { Prisma } from "@/app/generated/prisma/client";

const IMAGE_SIZE = 200 * 1024;
const SUPPORTED_FORMATS_IMAGE = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export async function createProject(formData: FormData) {
    const validatedFields = ProjectSchema.omit({
        featured: true
    }).safeParse({
    // const validatedFields = ProjectSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        githubUrl: formData.get("githubUrl") ?? "",
        liveUrl: formData.get("liveUrl") ?? "",
    });

    if (!validatedFields.success) {
        throw new Error("Validation failed");
    }

    const featured = formData.get("featured") === "true";

    const image = formData.get("image") as File | null;

    if (!image || image.size === 0) {
        throw new Error("Please select an image");
    }

    if (image.size > IMAGE_SIZE) {
        throw new Error("Image must be less than 200KB");
    }

    if (!SUPPORTED_FORMATS_IMAGE.includes(image.type)) {
        throw new Error("Unsupported file format");
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { title, slug, description, githubUrl, liveUrl } = validatedFields.data;
    try {
        const uploaded = await uploadToCloudinary(buffer, "developer-portfolio/projects/images");
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
        revalidatePath('/admin/projects');
    } catch (error) {
        console.error(error);
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            if (
                Array.isArray(error.meta?.target) &&
                error.meta.target.includes("slug")
            ) {
                return {
                    message: "Slug already exists.",
                };
            }
        }
        return {
            message: "Database Error: Failed to create project.",
        };
    }
    redirect('/admin/projects');
}

export async function updateProject(id: string, formData: FormData) {
    const validatedFields = ProjectSchema.omit({
        featured: true
    }).safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        githubUrl: formData.get("githubUrl") ?? "",
        liveUrl: formData.get("liveUrl") ?? "",
    });

    if (!validatedFields.success) {
        throw new Error("Validation failed");
    }

    const featured = formData.get("featured") === "true";
    const image = formData.get("image") as File | null;

    const { title, slug, description, githubUrl, liveUrl } = validatedFields.data;
    if (!image || image.size === 0) {
        try {
            await prisma.project.update({
                where: { id },
                data: {
                    title,
                    slug,
                    description,
                    githubUrl,
                    liveUrl,
                    featured,
                },
            });
            revalidatePath("/admin/projects");
        } catch (error) {
            console.error(error);
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                if (
                    Array.isArray(error.meta?.target) &&
                    error.meta.target.includes("slug")
                ) {
                    return {
                        message: "Slug already exists.",
                    };
                }
            }
            return {
                message: "Database Error: Failed to update project."
            }
        }
        redirect('/admin/projects');
    }

    if (image.size > IMAGE_SIZE) {
        throw new Error("Image must be less than 200KB");
    }

    if (!SUPPORTED_FORMATS_IMAGE.includes(image.type)) {
        throw new Error("Unsupported file format");
    }

    const project = await prisma.project.findUnique({
        where: {
            id
        },
        select: {
            projectImg: {
                select: {
                    cloudinaryPublicId: true,
                }
            }
        }
    });

    if (!project) {
        throw new Error("Project not found");
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    if (project?.projectImg?.cloudinaryPublicId) {
        await deleteFromCloudinary(project.projectImg.cloudinaryPublicId);
    }

    try {
        const uploaded = await uploadToCloudinary(buffer, "developer-portfolio/projects/images", project?.projectImg?.cloudinaryPublicId);
        await prisma.project.update({
            where: {
                id
            },
            data: {
                title,
                slug,
                description,
                githubUrl,
                liveUrl,
                featured,
                projectImg: {
                    update: {
                        imageUrl: uploaded.imageUrl,
                        cloudinaryPublicId: uploaded.cloudinaryPublicId,
                        imageName: image.name,
                    },
                },
            }
        });
        revalidatePath("/admin/projects");
    } catch (error) {
        console.error(error);
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            if (
                Array.isArray(error.meta?.target) &&
                error.meta.target.includes("slug")
            ) {
                return {
                    message: "Slug already exists.",
                };
            }
        }
        return {
            message: "Database Error: Failed to update project."
        }
    }
    redirect('/admin/projects');
}

export async function deleteProject(id: string) {
    const project = await prisma.project.findUnique({
        where: {
            id,
        },
        select: {
            projectImg: {
                select: {
                    cloudinaryPublicId: true
                }
            }
        }
    })
    try {
        if (project?.projectImg?.cloudinaryPublicId) {
            await deleteFromCloudinary(project.projectImg.cloudinaryPublicId)
        }
        await prisma.project.delete({
            where: {
                id
            }
        })
    } catch (error) {
        console.error(error);
        throw new Error("Database Error: Failed to delete project.");
    }
    revalidatePath("/admin/projects");
}