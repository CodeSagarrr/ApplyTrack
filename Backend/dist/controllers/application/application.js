import ApiError from "../../utils/ApiError.js";
import { Application } from "../../models/application.model.js";
import { runAnalysis } from "../../service/ats-service.js";
import { Resume } from "../../models/resume.model.js";
import { aiAtsService } from "../../config/langChain/atsAnalyzer.js";
import { MatchResult } from "../../models/matchResults.model.js";
export const createApplication = async (req, res, next) => {
    try {
        const { userId } = req;
        const { companyName, resume, roleTitle, contact, location, jd_text, salary_range, jd_URL, platForm, status, dateApplied, notes, matchResult, } = req.body;
        if (!userId) {
            throw new ApiError(404, "Invalid User!");
        }
        if (new Date(dateApplied) > new Date()) {
            throw new ApiError(400, "Application date cannot be in the future.");
        }
        const existingApplication = await Application.findOne({
            user: userId,
            companyName: { $regex: `^${companyName}$`, $options: "i" },
            roleTitle: { $regex: `^${roleTitle}$`, $options: "i" },
        });
        if (existingApplication) {
            throw new ApiError(409, "Application already exist!");
        }
        const application = await Application.create({
            user: userId,
            companyName,
            roleTitle,
            contact,
            jd_text,
            location,
            salary_range,
            resume,
            jd_URL,
            platForm,
            status,
            dateApplied: new Date(dateApplied) ?? new Date(),
            notes,
            matchResult,
        });
        if (!application) {
            throw new ApiError(400, "Failed to create application!");
        }
        const responseData = {
            id: application._id,
            companyName: application.companyName,
            roleTitle: application.roleTitle,
        };
        return res.status(201).json({
            success: true,
            data: responseData,
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
export const getAllApplications = async (req, res, next) => {
    try {
        const { userId } = req;
        const response = await Application.find({ user: userId })
            .select("id companyName roleTitle status platForm salary_range dateApplied createdAt updatedAt contact")
            .populate("resume", "id fileName ats_score");
        return res.status(200).json({
            success: true,
            data: response,
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
export const getFiltersApplication = async (req, res, next) => {
    try {
        const { userId } = req;
        const { status, from, to, search, cursor } = req.query;
        const limit = 5;
        const filters = {
            user: userId,
        };
        if (cursor) {
            filters._id = { $lt: cursor };
        }
        if (status) {
            filters.status = status;
        }
        if (search) {
            filters.$or = [
                { companyName: { $regex: search, $options: "i" } },
                { roleTitle: { $regex: search, $options: "i" } },
            ];
        }
        if (from || to) {
            filters.dateApplied = {};
            if (from)
                filters.dateApplied.$gte = new Date(from);
            if (to)
                filters.dateApplied.$lte = new Date(to);
        }
        const filtersApplications = await Application.find(filters)
            .limit(Number(limit))
            .sort({ _id: -1 })
            .select("id companyName roleTitle status platForm salary_range dateApplied createdAt updatedAt contact location notes")
            .populate("resume", "id fileName ats_score")
            .populate("matchResult", "matchScore");
        if (!filtersApplications || filtersApplications.length === 0) {
            throw new ApiError(404, "Not found!");
        }
        const hasNextPage = filtersApplications.length > Number(limit);
        if (hasNextPage) {
            filtersApplications.pop();
        }
        const cursorId = filtersApplications && filtersApplications.length > 0 && hasNextPage
            ? filtersApplications[filtersApplications.length - 1]?._id
            : null;
        return res.status(200).json({
            success: true,
            data: filtersApplications,
            cursorId,
            hasNextPage,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
export const getSpecificApplication = async (req, res, next) => {
    try {
        const { applicationId } = req.params;
        const { userId } = req;
        const application = await Application.findById({ _id: applicationId })
            .populate("resume", "id fileName ats_score")
            .populate("matchResult", "matchScore");
        if (!application) {
            throw new ApiError(404, "Application dosen't exist!");
        }
        if (String(application.user) !== userId) {
            throw new ApiError(403, "Application belongs to another user");
        }
        const responseData = {
            id: application._id,
            companyName: application.companyName,
            roleTitle: application.roleTitle,
            contact: application.contact,
            location: application.location,
            jd_text: application.jd_text,
            salary_range: application.salary_range,
            jd_URL: application.jd_URL,
            platForm: application.platForm,
            status: application.status,
            dateApplied: application.dateApplied,
            createdAt: application.createdAt,
            updatedAt: application.updatedAt,
            resume: application.resume,
            notes: application.notes,
            matchResult: application.matchResult,
        };
        return res.status(200).json({
            success: true,
            data: responseData,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
export const updateApplication = async (req, res, next) => {
    try {
        const { userId } = req;
        const { id } = req.params;
        const updateFields = req.body;
        const result = await Application.findByIdAndUpdate({ _id: id, user: userId }, { ...updateFields }, { new: true, runValidators: true });
        if (!result) {
            throw new ApiError(404, "Application dosen't exist");
        }
        if (String(result.user) !== userId) {
            throw new ApiError(403, "Application belongs to another user");
        }
        const responseData = {
            id: result._id,
            companyName: result.companyName,
            roleTitle: result.roleTitle,
            jd_text: result.jd_text,
            salary_range: result.salary_range,
            jd_URL: result.jd_URL,
            platForm: result.platForm,
            status: result.status,
            dateApplied: result.dateApplied,
            notes: result.notes,
        };
        return res.status(200).json({
            success: true,
            data: responseData,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
export const deleteApplication = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await Application.findByIdAndDelete(id);
        if (!response) {
            throw new ApiError(404, "Failed to find!");
        }
        return res.status(204).json({
            success: true,
            message: "Aplication deleted",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
export const specificApplicationAtsService = async (req, res, next) => {
    try {
        const { userId } = req;
        const { applicationId } = req.params;
        const { jd_text, resumeId } = req.body;
        const [resume, application] = await Promise.all([
            Resume.findById({ _id: resumeId }).select("_id parsedText user"),
            Application.findOne({
                _id: applicationId,
            }).select("_id matchResult user"),
        ]);
        if (!resume) {
            throw new ApiError(404, "Resume not found.");
        }
        if (!resume.parsedText) {
            throw new ApiError(422, "Resume is still being parsed.");
        }
        if (String(resume.user) !== userId) {
            throw new ApiError(403, "Resume belongs to another user.");
        }
        if (!jd_text) {
            throw new ApiError(404, "job description required");
        }
        if (!application) {
            throw new ApiError(404, "Application not found.");
        }
        if (String(application.user) !== userId) {
            throw new ApiError(403, "Resume belongs to another user.");
        }
        const aiResult = await aiAtsService(resume.parsedText, jd_text);
        let matchResultData;
        if (application?.matchResult) {
            matchResultData = await MatchResult.findByIdAndUpdate(application.matchResult, aiResult, {
                new: true,
                runValidators: true,
            }).lean();
        }
        else {
            matchResultData = await MatchResult.create({
                user: userId,
                application: applicationId,
                resume: resumeId,
                ...aiResult,
            });
            application.matchResult = matchResultData._id;
            await application.save();
        }
        return res.status(200).json({
            success: true,
            data: matchResultData,
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
export const atsService = async (req, res, next) => {
    try {
        const { userId } = req;
        const { id } = req.params;
        const result = await runAnalysis(id, userId);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
//# sourceMappingURL=application.js.map