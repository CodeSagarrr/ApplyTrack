import mongoose from "mongoose";
export declare const Application: mongoose.Model<{
    user: mongoose.Types.ObjectId;
    location: string;
    companyName: string;
    roleTitle: string;
    contact: string;
    jd_text: string;
    salary_range: string;
    jd_URL: string;
    platForm: string;
    status: "Applied" | "Screening" | "Interview" | "Offer" | "Rejected";
    dateApplied: NativeDate;
    notes: string;
    resume?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    user: mongoose.Types.ObjectId;
    location: string;
    companyName: string;
    roleTitle: string;
    contact: string;
    jd_text: string;
    salary_range: string;
    jd_URL: string;
    platForm: string;
    status: "Applied" | "Screening" | "Interview" | "Offer" | "Rejected";
    dateApplied: NativeDate;
    notes: string;
    resume?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    user: mongoose.Types.ObjectId;
    location: string;
    companyName: string;
    roleTitle: string;
    contact: string;
    jd_text: string;
    salary_range: string;
    jd_URL: string;
    platForm: string;
    status: "Applied" | "Screening" | "Interview" | "Offer" | "Rejected";
    dateApplied: NativeDate;
    notes: string;
    resume?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    user: mongoose.Types.ObjectId;
    location: string;
    companyName: string;
    roleTitle: string;
    contact: string;
    jd_text: string;
    salary_range: string;
    jd_URL: string;
    platForm: string;
    status: "Applied" | "Screening" | "Interview" | "Offer" | "Rejected";
    dateApplied: NativeDate;
    notes: string;
    resume?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    user: mongoose.Types.ObjectId;
    location: string;
    companyName: string;
    roleTitle: string;
    contact: string;
    jd_text: string;
    salary_range: string;
    jd_URL: string;
    platForm: string;
    status: "Applied" | "Screening" | "Interview" | "Offer" | "Rejected";
    dateApplied: NativeDate;
    notes: string;
    resume?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    user: mongoose.Types.ObjectId;
    location: string;
    companyName: string;
    roleTitle: string;
    contact: string;
    jd_text: string;
    salary_range: string;
    jd_URL: string;
    platForm: string;
    status: "Applied" | "Screening" | "Interview" | "Offer" | "Rejected";
    dateApplied: NativeDate;
    notes: string;
    resume?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    user: mongoose.Types.ObjectId;
    location: string;
    companyName: string;
    roleTitle: string;
    contact: string;
    jd_text: string;
    salary_range: string;
    jd_URL: string;
    platForm: string;
    status: "Applied" | "Screening" | "Interview" | "Offer" | "Rejected";
    dateApplied: NativeDate;
    notes: string;
    resume?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    user: mongoose.Types.ObjectId;
    location: string;
    companyName: string;
    roleTitle: string;
    contact: string;
    jd_text: string;
    salary_range: string;
    jd_URL: string;
    platForm: string;
    status: "Applied" | "Screening" | "Interview" | "Offer" | "Rejected";
    dateApplied: NativeDate;
    notes: string;
    resume?: mongoose.Types.ObjectId | null;
    matchResult?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=application.model.d.ts.map