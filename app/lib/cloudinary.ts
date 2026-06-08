import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

type UploadedImage = {
    imageUrl: string;
    cloudinaryPublicId: string;
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadToCloudinary(
    buffer: Buffer,
    folder: string
): Promise<UploadedImage> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder,
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
                else resolve({cloudinaryPublicId: result!.public_id, imageUrl: result!.secure_url}!);
            }
        ).end(buffer);
    });
}

function deleteFromCloudinary(
    publicId: String,
){
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId)
    });
}

// async function deleteFromCloudinary(publicId, resource_type = "image") {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.destroy(publicId, {resource_type}, (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//         });
//     });
// }

export { uploadToCloudinary };