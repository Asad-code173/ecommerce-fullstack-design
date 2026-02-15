import { v2 as cloudinary, type UploadApiResponse, type UploadApiErrorResponse } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



 //Upload file to Cloudinary
 
export const uploadOnCloudinary = async (
  localFilePath: string
): Promise<UploadApiResponse | null> => {
  try {
    if (!localFilePath) return null;

    const response: UploadApiResponse = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: "auto",
      }
    );

    console.log("File uploaded to Cloudinary:", response.secure_url);

    // remove local temp file
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // remove file if upload fails
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};


//Delete file from Cloudinary
 
export const deleteFromCloudinary = async (
  fileUrl: string
): Promise<void> => {
  try {
    if (!fileUrl) return;

    // Extract public ID from URL
    const publicId = path.parse(fileUrl.split("/").pop() as string).name;

    const result = await cloudinary.uploader.destroy(publicId);

    console.log("Deleted from Cloudinary:", result);
  } catch (error) {
    console.error("Failed to delete from Cloudinary:", error);
    throw error;
  }
};
