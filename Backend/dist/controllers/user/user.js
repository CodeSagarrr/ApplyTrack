import { User } from "../../models/auth.user.model.js";
import { UserProfile } from "../../models/user.profile.model.js";
import ApiError from "../../utils/ApiError.js";
import { uploadImage } from "../../utils/imageParse.js";
export const CurrentUser = async (req, res, next) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId).select("_id name email profileImage createdAt planTier").lean();
        return res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        next(error);
    }
};
// Profile controller 
export const createUserProfile = async (req, res, next) => {
    try {
        const { userId } = req;
        const updatedFields = {
            ...req.body,
            location: req.body.location ? JSON.parse(req.body.location) : undefined,
            socialLinks: req.body.socialLinks ? JSON.parse(req.body.socialLinks) : undefined,
            skills: req.body.skills ? JSON.parse(req.body.skills) : undefined,
        };
        const file = req.file;
        const secureImageUrl = file ? await uploadImage(file) : null;
        const updateData = {
            ...updatedFields,
            ...(secureImageUrl && {
                profileImage: secureImageUrl.secure_url,
            }),
        };
        const profile = await UserProfile.findOneAndUpdate({ user: userId }, updateData, {
            new: true,
            upsert: true,
        });
        return res.status(201).json({
            success: true,
            data: profile,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getUserProfile = async (req, res, next) => {
    try {
        const { userId } = req;
        const result = await UserProfile.findOne({ user: userId })
            .lean();
        if (!result) {
            throw new ApiError(404, "Profile dosent exist");
        }
        if (String(result.user) !== userId) {
            throw new ApiError(403, "Profile belongs to another user");
        }
        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
//# sourceMappingURL=user.js.map