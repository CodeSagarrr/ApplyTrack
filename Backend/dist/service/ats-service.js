import { Application } from "../models/application.model.js";
import ApiError from "../utils/ApiError.js";
import { aiAtsService } from "../config/langChain/atsAnalyzer.js";
import { MatchResult } from "../models/matchResults.model.js";
export const runAnalysis = async (applicationId, userId) => {
    // Fetch only required fields
    const application = await Application.findById(applicationId)
        .select("user resume jd_text matchResult")
        .populate({
        path: "resume",
        select: "_id parsedText",
    });
    if (!application) {
        throw new ApiError(404, "Application not found.");
    }
    if (String(application.user) !== userId) {
        throw new ApiError(403, "Unauthorized access to application.");
    }
    const { resume, jd_text } = application;
    if (!resume) {
        throw new ApiError(400, "Resume not linked. first link a resume in the application.");
    }
    if (!resume.parsedText) {
        throw new ApiError(422, "Resume is still being parsed.");
    }
    if (!jd_text) {
        throw new ApiError(400, "Job description is required.");
    }
    // Run AI analysis
    const aiResult = await aiAtsService(resume.parsedText, jd_text);
    let matchResultData;
    if (application.matchResult) {
        matchResultData = await MatchResult.findByIdAndUpdate(application.matchResult, aiResult, {
            new: true,
            runValidators: true
        }).lean();
    }
    else {
        matchResultData = await MatchResult.create({
            user: userId,
            application: application._id,
            resume: application.resume._id,
            ...aiResult
        });
        application.matchResult = matchResultData._id;
        await application.save();
    }
    return matchResultData;
};
//# sourceMappingURL=ats-service.js.map