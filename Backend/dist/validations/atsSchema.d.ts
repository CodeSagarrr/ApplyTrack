import z from "zod";
export declare const AtsSchema: z.ZodObject<{
    matchScore: z.ZodNumber;
    matched_keywords: z.ZodArray<z.ZodString>;
    missing_keywords: z.ZodArray<z.ZodString>;
    suggestions: z.ZodArray<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        current: z.ZodOptional<z.ZodString>;
        suggested: z.ZodOptional<z.ZodString>;
        impact: z.ZodOptional<z.ZodString>;
    }, z.z.core.$strip>>;
    atsIssues: z.ZodArray<z.ZodObject<{
        severity: z.ZodEnum<{
            LOW: "LOW";
            MEDIUM: "MEDIUM";
            HIGH: "HIGH";
        }>;
        category: z.ZodEnum<{
            Formatting: "Formatting";
            Keywords: "Keywords";
            Experience: "Experience";
            Skills: "Skills";
            Education: "Education";
            Projects: "Projects";
        }>;
        message: z.ZodString;
    }, z.z.core.$strip>>;
}, z.z.core.$strip>;
//# sourceMappingURL=atsSchema.d.ts.map