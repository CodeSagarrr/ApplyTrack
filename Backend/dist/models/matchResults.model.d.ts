import mongoose from "mongoose";
export declare const MatchResult: mongoose.Model<{
    resume: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    matchScore: number;
    matched_keywords: string[];
    missing_keywords: string[];
    suggestions: mongoose.Types.DocumentArray<{
        title?: string | null;
        current?: string | null;
        suggested?: string | null;
        impact?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
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
    atsIssues: mongoose.Types.DocumentArray<{
        message: string;
        severity: string;
        category: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        message: string;
        severity: string;
        category: string;
    }, {}, {}> & {
        message: string;
        severity: string;
        category: string;
    }>;
    application?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    resume: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    matchScore: number;
    matched_keywords: string[];
    missing_keywords: string[];
    suggestions: mongoose.Types.DocumentArray<{
        title?: string | null;
        current?: string | null;
        suggested?: string | null;
        impact?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
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
    atsIssues: mongoose.Types.DocumentArray<{
        message: string;
        severity: string;
        category: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        message: string;
        severity: string;
        category: string;
    }, {}, {}> & {
        message: string;
        severity: string;
        category: string;
    }>;
    application?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    resume: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    matchScore: number;
    matched_keywords: string[];
    missing_keywords: string[];
    suggestions: mongoose.Types.DocumentArray<{
        title?: string | null;
        current?: string | null;
        suggested?: string | null;
        impact?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
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
    atsIssues: mongoose.Types.DocumentArray<{
        message: string;
        severity: string;
        category: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        message: string;
        severity: string;
        category: string;
    }, {}, {}> & {
        message: string;
        severity: string;
        category: string;
    }>;
    application?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    resume: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    matchScore: number;
    matched_keywords: string[];
    missing_keywords: string[];
    suggestions: mongoose.Types.DocumentArray<{
        title?: string | null;
        current?: string | null;
        suggested?: string | null;
        impact?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
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
    atsIssues: mongoose.Types.DocumentArray<{
        message: string;
        severity: string;
        category: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        message: string;
        severity: string;
        category: string;
    }, {}, {}> & {
        message: string;
        severity: string;
        category: string;
    }>;
    application?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    resume: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    matchScore: number;
    matched_keywords: string[];
    missing_keywords: string[];
    suggestions: mongoose.Types.DocumentArray<{
        title?: string | null;
        current?: string | null;
        suggested?: string | null;
        impact?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
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
    atsIssues: mongoose.Types.DocumentArray<{
        message: string;
        severity: string;
        category: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        message: string;
        severity: string;
        category: string;
    }, {}, {}> & {
        message: string;
        severity: string;
        category: string;
    }>;
    application?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    resume: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    matchScore: number;
    matched_keywords: string[];
    missing_keywords: string[];
    suggestions: mongoose.Types.DocumentArray<{
        title?: string | null;
        current?: string | null;
        suggested?: string | null;
        impact?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
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
    atsIssues: mongoose.Types.DocumentArray<{
        message: string;
        severity: string;
        category: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        message: string;
        severity: string;
        category: string;
    }, {}, {}> & {
        message: string;
        severity: string;
        category: string;
    }>;
    application?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    resume: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    matchScore: number;
    matched_keywords: string[];
    missing_keywords: string[];
    suggestions: mongoose.Types.DocumentArray<{
        title?: string | null;
        current?: string | null;
        suggested?: string | null;
        impact?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
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
    atsIssues: mongoose.Types.DocumentArray<{
        message: string;
        severity: string;
        category: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        message: string;
        severity: string;
        category: string;
    }, {}, {}> & {
        message: string;
        severity: string;
        category: string;
    }>;
    application?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    resume: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    matchScore: number;
    matched_keywords: string[];
    missing_keywords: string[];
    suggestions: mongoose.Types.DocumentArray<{
        title?: string | null;
        current?: string | null;
        suggested?: string | null;
        impact?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
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
    atsIssues: mongoose.Types.DocumentArray<{
        message: string;
        severity: string;
        category: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        message: string;
        severity: string;
        category: string;
    }, {}, {}> & {
        message: string;
        severity: string;
        category: string;
    }>;
    application?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=matchResults.model.d.ts.map