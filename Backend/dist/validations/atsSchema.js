import z from "zod";
export const AtsSchema = z.object({
    matchScore: z.number(),
    matched_keywords: z.array(z.string()),
    missing_keywords: z.array(z.string()),
    suggestions: z.array(z.object({
        title: z.string().optional(),
        current: z.string().optional(),
        suggested: z.string().optional(),
        impact: z.string().optional(),
    })),
    atsIssues: z.array(z.object({
        severity: z.enum([
            "LOW",
            "MEDIUM",
            "HIGH"
        ]),
        category: z.enum([
            "Formatting",
            "Keywords",
            "Experience",
            "Skills",
            "Education",
            "Projects"
        ]),
        message: z.string()
    }))
});
//# sourceMappingURL=atsSchema.js.map