import zod from "zod";
export const userProfileSchema = zod.object({
    headline: zod.string().optional(),
    collegeName: zod.string().optional(),
    about: zod.string().optional(),
    profileImage: zod.string().optional(),
    phone: zod.string().optional(),
    location: zod.object({
        city: zod.string().optional(),
        state: zod.string().optional(),
        country: zod.string().optional()
    }).optional(),
    socialLinks: zod.object({
        github: zod.string().optional(),
        linkedin: zod.string().optional(),
        portfolio: zod.string().optional(),
        twitter: zod.string().optional(),
        leetcode: zod.string().optional(),
    }).optional(),
    skills: zod.array(zod.string()).optional(),
    preferredRole: zod.string().optional(),
    yearsOfExperience: zod.number().optional()
}).optional();
//# sourceMappingURL=user.profile.validate.js.map