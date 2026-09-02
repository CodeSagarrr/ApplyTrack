import type { Request, Response, NextFunction } from "express";
import type { AuthUserId } from "../../types/controllerTypes.js";
import { uploadResume } from "../../utils/imageParse.js";
import { Resume } from "../../models/resume.model.js";
import ApiError from "../../utils/ApiError.js";
import { parseResume } from "./textParsing.js";
import { Application } from "../../models/application.model.js";
import cloudinary from "cloudinary";

const deleteFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: "raw",
    });

    return result;
  } catch (error) {
    console.error("Cloudinary delete failed:", error);
    throw error;
  }
};

export const createResume = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req as AuthUserId;
    const selectedFields = req.body;
    const file = req.file;

    const [CreateResumeURL, parseResumeText] = await Promise.all([
      uploadResume(file as Express.Multer.File),
      parseResume(file?.mimetype as string, file?.buffer as Buffer),
    ]);

    if (!CreateResumeURL) {
      throw new ApiError(404, "File is required");
    }

    const payLoad = {
      user: userId,
      ...selectedFields,
      ...(parseResumeText && {
        parsedText: parseResumeText,
        parsingStatus: "COMPLETED",
      }),
      ...(CreateResumeURL && {
        file_URL: CreateResumeURL.secure_url,
        public_id: CreateResumeURL.public_id,
        fileName: CreateResumeURL.original_filename,
      }),
    };
    const response = await Resume.create(payLoad);

    return res.status(201).json({
      success: true,
      data: {
        _id: response._id,
        parsedText: response.parsedText,
        parsingStatus: response.parsingStatus,
        fileName: response.fileName,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateResumeDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req as AuthUserId;
    const { id } = req.params;
    const updatedFields = req.body;
    const file = req.file;

    let result = null;
    let parsedText = null;
    let oldFile = null;

    if (file) {
      [result, parsedText, oldFile] = await Promise.all([
        uploadResume(file),
        parseResume(file.mimetype, file.buffer),
        Resume.findById({ _id: id, user: userId as string }).select(
          "public_id",
        ),
      ]);
    }

    const updateData: any = { ...updatedFields };

    if (parsedText) {
      updateData.parsedText = parsedText;
      updateData.parsingStatus = "COMPLETED";
    }

    const public_id = oldFile?.public_id as string;

    if (result) {
      try {
        deleteFromCloudinary(public_id);
      } catch (err) {
        console.error(err);
      }
      updateData.file_URL = result.secure_url;
      updateData.public_id = result.public_id;
      updateData.fileName = result.original_filename;
    }

    const response = await Resume.findByIdAndUpdate(
      { _id: id, user: userId as string },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    ).select("id fileName");

    if (!response) {
      throw new ApiError(404, "Not found!");
    }

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getResumes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req as AuthUserId;

    const response = await Resume.find({ user: userId as string })
      .select(
        "id user fileName versionName isDefault file_URL ats_score updatedAt createdAt",
      )
      .lean();

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getSpecificResume = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req as AuthUserId;
    const { id } = req.params;

    const response = await Resume.findById(id)
      .select("id user fileName file_URL parsedText parsingStatus ats_score")
      .lean();

    if (!response) {
      throw new ApiError(404, "Not found!");
    }

    if (String(response.user) !== userId) {
      throw new ApiError(403, "Application belongs to another user");
    }

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteResume = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req as AuthUserId;
    const { id } = req.params;
    const { force } = req.query

    const isExistResume = await Resume.findById(id);

    if (!isExistResume) {
      throw new ApiError(404, "Not found!");
    }

    if (isExistResume.user.toString() !== userId) {
      throw new ApiError(403, "Unauthorized.");
    }

    const isExistInApplication = await Application.find({
      resume: id as string,
      status: {
        $in: ["Applied", "Screening", "Interview", "Offer"],
      },
    });


    if (isExistInApplication && force === "false") {
      throw new ApiError(409, `Resume is being used by ${isExistInApplication.length} application!`);
    }

    if (isExistInApplication && force === "true") {
      await Application.updateMany(
        { resume: id as string, user: userId },
        { $set: { resume: null } },
        { runValidators: true },
      );
    }

    const [cloudinaryResult, deletedResume] = await Promise.all([
      deleteFromCloudinary(isExistResume.public_id),
      Resume.findByIdAndDelete(id),
    ]);

    if (cloudinaryResult.result !== "ok") {
      throw new ApiError(500, "Failed to delete file from Cloudinary.");
    }

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateResumeDefaultStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { userId }: AuthUserId = req;

    await Resume.updateMany(
      { user: userId as string },
      { $set: { isDefault: false } },
    );

    const response = await Resume.findByIdAndUpdate(
      id,
      {
        isDefault: true,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true },
    )
      .select("id isDefault")
      .lean();

    if (!response) {
      throw new ApiError(404, "Not found!");
    }

    if (response.isDefault) {
      return res.status(200).json({
        message: "Resume is already the default.",
      });
    }

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
