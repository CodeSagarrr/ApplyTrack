import zod from "zod";
export declare const ValidateApplicationCreation: zod.ZodObject<{
    companyName: zod.ZodString;
    roleTitle: zod.ZodString;
    jd_text: zod.ZodOptional<zod.ZodString>;
    salary_range: zod.ZodOptional<zod.ZodString>;
    contact: zod.ZodOptional<zod.ZodString>;
    jd_URL: zod.ZodOptional<zod.ZodString>;
    platForm: zod.ZodString;
    dateApplied: zod.ZodOptional<zod.ZodString>;
    notes: zod.ZodOptional<zod.ZodString>;
    resume: zod.ZodOptional<zod.ZodString>;
    location: zod.ZodOptional<zod.ZodString>;
}, zod.z.core.$strip>;
export declare const ValidateApplicationUpdation: zod.ZodObject<{
    companyName: zod.ZodOptional<zod.ZodString>;
    roleTitle: zod.ZodOptional<zod.ZodString>;
    jd_text: zod.ZodOptional<zod.ZodString>;
    salary_range: zod.ZodOptional<zod.ZodString>;
    contact: zod.ZodOptional<zod.ZodString>;
    jd_URL: zod.ZodOptional<zod.ZodString>;
    platForm: zod.ZodOptional<zod.ZodString>;
    status: zod.ZodOptional<zod.ZodString>;
    dateApplied: zod.ZodOptional<zod.ZodString>;
    notes: zod.ZodOptional<zod.ZodString>;
    resume: zod.ZodOptional<zod.ZodString>;
    location: zod.ZodOptional<zod.ZodString>;
}, zod.z.core.$strip>;
//# sourceMappingURL=application.validate.d.ts.map