import mongoose from "mongoose";
export declare const Resume: mongoose.Model<{
    updatedAt: NativeDate;
    user: mongoose.Types.ObjectId;
    public_id: string;
    file_URL: string;
    parsedText: string;
    parsingStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
    isDefault: boolean;
    ats_score: number;
    fileName?: string | null;
    versionName?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    updatedAt: NativeDate;
    user: mongoose.Types.ObjectId;
    public_id: string;
    file_URL: string;
    parsedText: string;
    parsingStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
    isDefault: boolean;
    ats_score: number;
    fileName?: string | null;
    versionName?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    updatedAt: NativeDate;
    user: mongoose.Types.ObjectId;
    public_id: string;
    file_URL: string;
    parsedText: string;
    parsingStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
    isDefault: boolean;
    ats_score: number;
    fileName?: string | null;
    versionName?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    updatedAt: NativeDate;
    user: mongoose.Types.ObjectId;
    public_id: string;
    file_URL: string;
    parsedText: string;
    parsingStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
    isDefault: boolean;
    ats_score: number;
    fileName?: string | null;
    versionName?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    updatedAt: NativeDate;
    user: mongoose.Types.ObjectId;
    public_id: string;
    file_URL: string;
    parsedText: string;
    parsingStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
    isDefault: boolean;
    ats_score: number;
    fileName?: string | null;
    versionName?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    updatedAt: NativeDate;
    user: mongoose.Types.ObjectId;
    public_id: string;
    file_URL: string;
    parsedText: string;
    parsingStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
    isDefault: boolean;
    ats_score: number;
    fileName?: string | null;
    versionName?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    updatedAt: NativeDate;
    user: mongoose.Types.ObjectId;
    public_id: string;
    file_URL: string;
    parsedText: string;
    parsingStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
    isDefault: boolean;
    ats_score: number;
    fileName?: string | null;
    versionName?: string | null;
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    updatedAt: NativeDate;
    user: mongoose.Types.ObjectId;
    public_id: string;
    file_URL: string;
    parsedText: string;
    parsingStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
    isDefault: boolean;
    ats_score: number;
    fileName?: string | null;
    versionName?: string | null;
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=resume.model.d.ts.map