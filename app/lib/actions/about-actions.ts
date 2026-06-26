"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { BasicInfoSchema } from "../validations/basic-info-schema";
import { deleteFromCloudinary, uploadToCloudinary } from "../cloudinary";

const IMAGE_SIZE = 200 * 1024;
const SUPPORTED_FORMATS_IMAGE = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export async function createBasicInfo(formData: FormData) {
    const validatedFields = BasicInfoSchema.omit({
        roles: true
    }).safeParse({
        fullName: formData.get("fullName"),
        summary: formData.get("summary"),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Validation failed."
        }
    }

    const roles = formData.getAll("roles") as string[];
    const image = formData.get("profileImg") as File | null;

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

    const { fullName, summary } = validatedFields.data;
    try {
        const uploaded = await uploadToCloudinary(buffer, "developer-portfolio/about/images");
        await prisma.about.create({
            data: {
                fullName,
                summary,
                roles,
                profileImg: {
                    create: {
                        imageUrl: uploaded.imageUrl,
                        cloudinaryPublicId: uploaded.cloudinaryPublicId,
                        imageName: image.name,
                    }
                }
            }
        });
        revalidatePath('/dashboard/about');
        return {
            success: true,
            message: "Basic information created."
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Database Error: Failed to create basic information."
        }
    }
}

export async function updateBasicInfo(formData: FormData) {
    const validatedFields = BasicInfoSchema.omit({
        roles: true
    }).safeParse({
        fullName: formData.get("fullName"),
        summary: formData.get("summary"),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Validation failed."
        }
    }

    const roles = formData.getAll("roles") as string[];
    const image = formData.get("profileImg") as File | null;

    const { fullName, summary } = validatedFields.data;
    if (!image || image.size === 0) {
        try {
            await prisma.about.updateMany({
                data: {
                    fullName,
                    summary,
                    roles,
                },
            });
            revalidatePath("/dashboard/about");
            return {
                success: true,
                message: "Basic information updated."
            }
        } catch (error) {
            console.error(error);
            return {
                message: "Database Error: Failed to update basic information."
            }
        }
    }

    if (image.size > IMAGE_SIZE) {
        throw new Error("Image must be less than 200KB");
    }

    if (!SUPPORTED_FORMATS_IMAGE.includes(image.type)) {
        throw new Error("Unsupported file format");
    }

    const about = await prisma.about.findFirst({
        select: {
            id: true,
            profileImg: {
                select: {
                    cloudinaryPublicId: true,
                }
            }
        }
    });

    if (!about) {
        throw new Error("Basic information not found");
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    if (about?.profileImg?.cloudinaryPublicId) {
        await deleteFromCloudinary(about.profileImg.cloudinaryPublicId)
    }

    try {
        const uploaded = await uploadToCloudinary(buffer, "developer-portfolio/about/images");
        await prisma.about.update({
            where: {
                id: about.id,
            },
            data: {
                fullName,
                summary,
                roles,
                profileImg: {
                    update: {
                        imageUrl: uploaded.imageUrl,
                        cloudinaryPublicId: uploaded.cloudinaryPublicId,
                        imageName: image.name,
                    }
                }
            }
        });
        revalidatePath('/dashboard/about');
        return {
            success: true,
            message: "Basic information updated."
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Database Error: Failed to update basic information."
        }
    }
}