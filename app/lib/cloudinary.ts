import "server-only";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

type UploadedImage = {
    fileUrl: string;
    cloudinaryPublicId: string;
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadToCloudinary(
    buffer: Buffer,
    folder: string,
    existingPublicId?: string,
    resourceType: "image" | "raw" | "auto" = "auto"
): Promise<UploadedImage> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
                ...(existingPublicId && {
                    public_id: existingPublicId,
                    overwrite: true,
                    invalidate: true,
                }),
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    reject(new Error("Cloudinary upload failed"));
                    return;
                }
                else resolve({cloudinaryPublicId: result!.public_id, fileUrl: result!.secure_url}!);
            }
        ).end(buffer);
    });
}

function deleteFromCloudinary(
    publicId: string,
){
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        })
    });
}

export { uploadToCloudinary, deleteFromCloudinary };