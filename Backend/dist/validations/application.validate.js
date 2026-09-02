import zod from "zod";
export const ValidateApplicationCreation = zod.object({
    companyName: zod.string({ error: "Company name is required " }).trim(),
    roleTitle: zod.string({ error: "Role is required " }).trim(),
    jd_text: zod.string().trim().optional(),
    salary_range: zod.string().trim().optional(),
    contact: zod.string().trim().optional(),
    jd_URL: zod.string().trim().optional(),
    platForm: zod.string({ error: "Platform is required" }).trim(),
    dateApplied: zod.string().optional(),
    notes: zod.string().trim().optional(),
    resume: zod.string().trim().optional(),
    location: zod.string().trim().optional(),
});
export const ValidateApplicationUpdation = zod.object({
    companyName: zod.string({ error: "Company name is required " }).trim().optional(),
    roleTitle: zod.string({ error: "Role is required " }).trim().optional(),
    jd_text: zod.string().trim().optional(),
    salary_range: zod.string().trim().optional(),
    contact: zod.string().trim().optional(),
    jd_URL: zod.string().trim().optional(),
    platForm: zod.string({ error: "Platform is required" }).trim().optional(),
    status: zod.string().trim().optional(),
    dateApplied: zod.string().optional(),
    notes: zod.string().trim().optional(),
    resume: zod.string().trim().optional(),
    location: zod.string().trim().optional(),
});
//# sourceMappingURL=application.validate.js.map