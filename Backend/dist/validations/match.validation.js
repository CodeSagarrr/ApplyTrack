import zod from "zod";
export const MatchJobDescription = zod.object({
    jd_text: zod.string({ error: "job description is required " }).min(10, { error: "Length should be 10 chars long" }),
    resumeId: zod.string({ error: "resume is required " })
});
//# sourceMappingURL=match.validation.js.map