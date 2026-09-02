export declare const runAnalysis: (applicationId: string, userId: string) => Promise<({
    resume: import("mongoose").Types.ObjectId;
    user: import("mongoose").Types.ObjectId;
    matchScore: number;
    matched_keywords: string[];
    missing_keywords: string[];
    suggestions: import("mongoose").Types.DocumentArray<{
        title?: string | null;
        current?: string | null;
        suggested?: string | null;
        impact?: string | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        title?: string | null;
        current?: string | null;
        suggested?: string | null;
        impact?: string | null;
    }, {}, {}> & {
        title?: string | null;
        current?: string | null;
        suggested?: string | null;
        impact?: string | null;
    }>;
    atsIssues: import("mongoose").Types.DocumentArray<{
        message: string;
        severity: string;
        category: string;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        message: string;
        severity: string;
        category: string;
    }, {}, {}> & {
        message: string;
        severity: string;
        category: string;
    }>;
    application?: import("mongoose").Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & Required<{
    _id: import("mongoose").Types.ObjectId;
}>) | null>;
//# sourceMappingURL=ats-service.d.ts.map