import type { NextFunction, Request, Response } from "express";
import { Application } from "../../models/application.model.js";
import type { AuthUserId } from "../../types/controllerTypes.js";
import  ApiError  from "../../utils/ApiError.js"
import mongoose from "mongoose";

const now = new Date();

const startDate = new Date(now.getFullYear(), now.getMonth());

const endDate = new Date(now.getFullYear(), now.getMonth() + 1);

export const GetMatrixData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId }: AuthUserId = req;

    const [response] = await Application.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },

      {
        $lookup: {
          from: "matchresults",
          localField: "matchResult",
          foreignField: "_id",
          as: "matchResultData",
        },
      },

      {
        $unwind: { path: "$matchResultData", preserveNullAndEmptyArrays: true },
      },

      {
        $facet: {
          activeApplications: [
            {
              $match: {
                status: {
                  $nin: ["Rejected"],
                },
              },
            },
            { $count: "count" },
          ],

          averageMatchScore: [
            {
              $match: {
                "matchResultData.matchScore": {
                  $exists: true,
                  $ne: null,
                },
              },
            },
            {
              $group: {
                _id: null,
                average: {
                  $avg: "$matchResultData.matchScore",
                },
                analyzedApplications: {
                  $sum: 1,
                },
              },
            },
          ],

          applicationsThisMonth: [
            {
              $match: {
                createdAt: {
                  $gt: startDate,
                  $lt: endDate,
                },
              },
            },
            { $count: "count" },
          ],

          interviewApplications: [
            {
              $match: {
                status: "Interview",
              },
            },
            { $count: "count" },
          ],

          recentApplications: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $limit: 4,
            },
            {
              $project: {
                _id: 1,
                companyName: 1,
                roleTitle: 1,
                status: 1,
                createdAt: 1,
                "matchScore": "$matchResultData.matchScore",
              },
            },
          ],

          pipeline: [
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },
              },
            },
          ],

          totalApplications: [{ $count: "count" }],
        },
      },
    ]);

    const data = response ?? {};

    const activeApplications = data.activeApplications?.[0]?.count ?? 0;

    const applicationsThisMonth = data.applicationsThisMonth?.[0]?.count ?? 0;

    const analyzedApplications =
      data.averageMatchScore?.[0]?.analyzedApplications ?? 0;

    const averageMatchScore =
      data.averageMatchScore?.[0]?.average !== null
        ? Math.round(data.averageMatchScore?.[0]?.average)
        : null;

    const interviewApplications = data.interviewApplications?.[0]?.count ?? 0;

    const totalApplications = data.totalApplications?.[0]?.count ?? 0;

    const recentApplications = data.recentApplications ?? []
    const pipeline = data.pipeline ?? []

    const result = {
      activeApplications,
      applicationsThisMonth,
      analyzedApplications,
      averageMatchScore,
      interviewApplications,
      totalApplications,
      recentApplications,
      pipeline
    };

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
