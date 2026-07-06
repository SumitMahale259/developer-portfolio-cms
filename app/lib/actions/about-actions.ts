"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { AboutSchema } from "../validations/about-schema";
import { deleteFromCloudinary, uploadToCloudinary } from "../cloudinary";
import { Prisma } from "@/app/generated/prisma/client";
import { formDataToObject } from "../formDataToObject";

const IMAGE_SIZE = 200 * 1024;
const RESUME_SIZE = 300 * 1024;
const SUPPORTED_FORMATS_IMAGE = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const SUPPORTED_FORMATS_RESUME = [
  "application/pdf",
];

export async function createAbout(formData: FormData) {
    // Convert FormData to an object
    const rawData = formDataToObject(formData);

    // Validate all fields required for creation
    const validatedFields = AboutSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: "Validation failed.",
        };
    }

    const data = validatedFields.data;
    const image = formData.get("profileImg");
    const resume = formData.get("resume");

    let profileImgData: Prisma.ProfileImageCreateWithoutAboutInput | undefined;
    let resumeData: Prisma.ResumeCreateWithoutAboutInput | undefined;

    if (image instanceof File && image.size > 0) {
        if (image.size > IMAGE_SIZE) {
            return {
                success: false,
                message: "Image must be less than 200KB.",
            };
        }

        if (!SUPPORTED_FORMATS_IMAGE.includes(image.type)) {
            return {
                success: false,
                message: "Unsupported image format.",
            };
        }

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploaded = await uploadToCloudinary(
            buffer,
            "developer-portfolio/about/images"
        );

        profileImgData = {
            imageUrl: uploaded.fileUrl,
            cloudinaryPublicId: uploaded.cloudinaryPublicId,
            imageName: image.name,
        };
    };

    if (resume instanceof File && resume.size > 0) {
        if (resume.size > RESUME_SIZE) {
            return {
                success: false,
                message: "Resume must be less than 5MB.",
            };
        }

        if (!SUPPORTED_FORMATS_RESUME.includes(resume.type)) {
            return {
                success: false,
                message: "Only PDF resumes are allowed.",
            };
        }

        const bytes = await resume.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploaded = await uploadToCloudinary(
            buffer,
            "developer-portfolio/about/resumes"
        );

        resumeData = {
            resumeUrl: uploaded.fileUrl,
            resumeCloudinaryPublicId: uploaded.cloudinaryPublicId,
            resumeName: resume.name,
        };
    };

    try {
        await prisma.about.create({
            data: {
                ...data,
                ...(profileImgData && {
                    profileImg: {
                        create: profileImgData,
                    },
                }),
                ...(resumeData && {
                    resume: {
                        create: resumeData,
                    },
                }),
            },
        });

        revalidatePath("/dashboard/about");

        return {
            success: true,
            message: "About information created successfully.",
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Database Error: Failed to create about information.",
        };
    }
}

export async function updateAbout(formData: FormData) {
    const about = await prisma.about.findFirst({
        include: {
            profileImg: true,
            resume: true,
        },
    });

    if (!about) {
        throw new Error("About information not found.");
    }

    // Convert FormData to an object
    const rawData = formDataToObject(formData);

    // Validate all submitted fields
    const validatedFields = AboutSchema.partial().safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: "Validation failed.",
        };
    }

    const data: Prisma.AboutUpdateInput = validatedFields.data;

    // Handle image separately
    const image = formData.get("profileImg");
    const resume = formData.get("resume");

    let profileImgData: Prisma.ProfileImageCreateWithoutAboutInput | undefined;
    let resumeData: Prisma.ResumeCreateWithoutAboutInput | undefined;

    if (image instanceof File && image.size > 0) {
        if (image.size > IMAGE_SIZE) {
            return {
                success: false,
                message: "Image must be less than 200KB.",
            };
        }

        if (!SUPPORTED_FORMATS_IMAGE.includes(image.type)) {
            return {
                success: false,
                message: "Unsupported image format.",
            };
        }

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        if (about.profileImg?.cloudinaryPublicId) {
            await deleteFromCloudinary(
                about.profileImg.cloudinaryPublicId
            );
        }

        const uploaded = await uploadToCloudinary(
            buffer,
            "developer-portfolio/about/images"
        );

        profileImgData  = {
            imageUrl: uploaded.fileUrl,
            cloudinaryPublicId: uploaded.cloudinaryPublicId,
            imageName: image.name,
        };
    };

    if (resume instanceof File && resume.size > 0) {
        if (resume.size > RESUME_SIZE) {
            return {
                success: false,
                message: "Resume must be less than 5MB.",
            };
        }

        if (!SUPPORTED_FORMATS_RESUME.includes(resume.type)) {
            return {
                success: false,
                message: "Only PDF resumes are allowed.",
            };
        }

        const bytes = await resume.arrayBuffer();
        const buffer = Buffer.from(bytes);

        if (about.resume?.resumeCloudinaryPublicId) {
            await deleteFromCloudinary(
                about.resume.resumeCloudinaryPublicId
            );
        }

        const uploaded = await uploadToCloudinary(
            buffer,
            "developer-portfolio/about/resumes"
        );

        resumeData = {
            resumeUrl: uploaded.fileUrl,
            resumeCloudinaryPublicId: uploaded.cloudinaryPublicId,
            resumeName: resume.name,
        };
    };

    const updateData: Prisma.AboutUpdateInput = {
        ...data,
    };

    if (profileImgData) {
        updateData.profileImg = about.profileImg
            ? { update: profileImgData }
            : { create: profileImgData };
    }

    if (resumeData) {
        updateData.resume = about.resume
            ? { update: resumeData }
            : { create: resumeData };
    }

    // Nothing to update
    if (Object.keys(updateData).length === 0) {
        return {
            success: true,
            message: "No changes detected.",
        };
    }

    try {
        await prisma.about.update({
            where: {
                id: about.id,
            },
            data: updateData,
        });
        revalidatePath("/dashboard/about");
        return {
            success: true,
            message: "About updated successfully.",
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Database Error: Failed to update about information.",
        };
    }
}