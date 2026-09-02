import zod from "zod";
export declare const userProfileSchema: zod.ZodOptional<zod.ZodObject<{
    headline: zod.ZodOptional<zod.ZodString>;
    collegeName: zod.ZodOptional<zod.ZodString>;
    about: zod.ZodOptional<zod.ZodString>;
    profileImage: zod.ZodOptional<zod.ZodString>;
    phone: zod.ZodOptional<zod.ZodString>;
    location: zod.ZodOptional<zod.ZodObject<{
        city: zod.ZodOptional<zod.ZodString>;
        state: zod.ZodOptional<zod.ZodString>;
        country: zod.ZodOptional<zod.ZodString>;
    }, zod.z.core.$strip>>;
    socialLinks: zod.ZodOptional<zod.ZodObject<{
        github: zod.ZodOptional<zod.ZodString>;
        linkedin: zod.ZodOptional<zod.ZodString>;
        portfolio: zod.ZodOptional<zod.ZodString>;
        twitter: zod.ZodOptional<zod.ZodString>;
        leetcode: zod.ZodOptional<zod.ZodString>;
    }, zod.z.core.$strip>>;
    skills: zod.ZodOptional<zod.ZodArray<zod.ZodString>>;
    preferredRole: zod.ZodOptional<zod.ZodString>;
    yearsOfExperience: zod.ZodOptional<zod.ZodNumber>;
}, zod.z.core.$strip>>;
//# sourceMappingURL=user.profile.validate.d.ts.map