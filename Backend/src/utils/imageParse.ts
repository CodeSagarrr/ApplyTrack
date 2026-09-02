import cloudinary, { type UploadApiResponse } from "cloudinary";
import ApiError from "./ApiError.js";

export const uploadImage = async (
  file: Express.Multer.File
): Promise<UploadApiResponse | null> => {
  if (!file) return null;

  try {
    const buffer = file.buffer;

    const resultImage = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadSteam = cloudinary.v2.uploader.upload_stream(
          {
            folder: "ApplyTrack-Image",
            secure: true,
            transformation: [
              { width: 500, height: 500, crop: "limit" },
              { quality: "auto" },
            ],
          },
          (error: any, result: any) => {
            if (error) reject(error);
            else if (result) resolve(result);
            else reject(new Error("Upload failed: no result returned"));
          }
        );
        uploadSteam.end(buffer);
      }
    );

    return resultImage;
  } catch (error) {
    console.error("Upload error:", error);
    throw new ApiError(500, "Failed to upload image");
  }
};


export const uploadResume = async (
  file: Express.Multer.File
): Promise<UploadApiResponse | null> => {
  if (!file) return null;

  try {
    const buffer = file.buffer;

    const fileResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadSteam = cloudinary.v2.uploader.upload_stream(
          {
            folder: "ApplyTrack-File",
            resource_type: "raw",
            use_filename: true,
            filename_override: file.originalname,
            unique_filename: true
          },
          (error: any, result: any) => {
            if (error) reject(error);
            else if (result) resolve(result);
            else reject(new Error("Upload failed: no result returned"));
          }
        );
        uploadSteam.end(buffer);
      }
    );

    return fileResult;
  } catch (error) {
    console.error("Upload error:", error);
    throw new ApiError(500, "Failed to upload image");
  }
};
