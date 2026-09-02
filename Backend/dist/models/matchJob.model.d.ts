import mongoose from "mongoose";
export declare const MatchJob: mongoose.Model<{
    error: string;
    status: "PROCESSING" | "COMPLETED" | "FAILED" | "QUEUED";
    resume?: mongoose.Types.ObjectId | null;
    user?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
    application?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    error: string;
    status: "PROCESSING" | "COMPLETED" | "FAILED" | "QUEUED";
    resume?: mongoose.Types.ObjectId | null;
    user?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
    application?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    error: string;
    status: "PROCESSING" | "COMPLETED" | "FAILED" | "QUEUED";
    resume?: mongoose.Types.ObjectId | null;
    user?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
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
    error: string;
    status: "PROCESSING" | "COMPLETED" | "FAILED" | "QUEUED";
    resume?: mongoose.Types.ObjectId | null;
    user?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
    application?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    error: string;
    status: "PROCESSING" | "COMPLETED" | "FAILED" | "QUEUED";
    resume?: mongoose.Types.ObjectId | null;
    user?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
    application?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    error: string;
    status: "PROCESSING" | "COMPLETED" | "FAILED" | "QUEUED";
    resume?: mongoose.Types.ObjectId | null;
    user?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
    application?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    error: string;
    status: "PROCESSING" | "COMPLETED" | "FAILED" | "QUEUED";
    resume?: mongoose.Types.ObjectId | null;
    user?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
    application?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    error: string;
    status: "PROCESSING" | "COMPLETED" | "FAILED" | "QUEUED";
    resume?: mongoose.Types.ObjectId | null;
    user?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
    application?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=matchJob.model.d.ts.map