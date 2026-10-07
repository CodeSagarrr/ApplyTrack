import {
  type Request,
  type Response,
  type NextFunction,
  application,
} from "express";
import { Application } from "../../models/application.model.js";
import ApiError from "../../utils/ApiError.js";
import { Resume } from "../../models/resume.model.js";
import type { AuthUserId } from "../../types/controllerTypes.js";
import { MatchJob } from "../../models/matchJob.model.js";
import { aiAtsService } from "../../config/langChain/atsAnalyzer.js";
import { MatchResult } from "../../models/matchResults.model.js";

export const createMatch = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req as AuthUserId;
    const { resumeId, jd_text } = req.body;

    if (!(resumeId && jd_text)) {
      throw new ApiError(400, "Invalid request.");
    }

    let resumeParsedText: string | null = null;

    const resume = await Resume.findById(resumeId)
      .select("parsedText")
      .orFail(() => new ApiError(404, "Application cant find resume"));

    resumeParsedText = resume.parsedText;

    const result = await MatchJob.create({
      user: userId!,
      resume: resumeId ? resumeId : null,
    });

    res.status(201).json({
      success: true,
      data: {
        jobId: result.id,
        status: result.status,
      },
    });

    await MatchJob.findByIdAndUpdate(result.id, {
      status: "PROCESSING",
    }).lean();

    setImmediate(async () => {
      try {
        const aiResult = await aiAtsService(
          resumeParsedText ?? "",
          jd_text ?? "",
        );
        const matchResult = await MatchResult.findOneAndUpdate(
          {
            user: userId!,
            resume: resumeId,
          },
          { ...aiResult },
          {
            new: true,
            upsert: true,
          },
        ).lean();

        await MatchJob.findByIdAndUpdate(
          result.id,
          { status: "COMPLETED", matchResult: matchResult._id },
          { new: true, runValidators: true },
        ).lean();
      } catch (error: any) {
        console.error(error);

        await MatchJob.findByIdAndUpdate(result.id, {
          status: "FAILED",
          error: error.message,
        }).lean();
      }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getMatchJobId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { jobId }: { jobId?: string } = req.params;
    const { userId } = req as AuthUserId;

    if (!jobId) {
      throw new ApiError(400, "JobId is required");
    }

    const result = await MatchJob.findById(jobId).select(
      "status user matchResult error",
    ).lean();

    if (!result) {
      throw new ApiError(404, "Match job not found");
    }

    if (String(result?.user) !== userId) {
      throw new ApiError(403, "MatchJob belongs to anothe user!");
    }

    if (!result.matchResult) {
      throw new ApiError(404, "Match results is failed!");
    }

    let data;

    if (result?.status === "COMPLETED") {
      data = await MatchResult.findOne(result.matchResult)
        .select(
          "id matchScore matched_keywords missing_keywords suggestions atsIssues",
        )
        .lean();
    }

    if (result.status === "COMPLETED" && !data) {
      throw new ApiError(500, "Match result not found.");
    }

    if (result.status === "FAILED" && !data) {
      return res.status(400).json({
        success: false,
        data: {
          status: result.status,
          error: result.error ?? null,
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        status: result.status,
        result: data ?? null,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
