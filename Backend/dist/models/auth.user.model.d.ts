import mongoose from "mongoose";
export declare const User: mongoose.Model<{
    name: string;
    email: string;
    profileImage: string;
    planTier: "FREE" | "PAID";
    passwordHash?: string | null;
    refreshToken?: string | null;
    oauthProvider?: string | null;
    oauthId?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    profileImage: string;
    planTier: "FREE" | "PAID";
    passwordHash?: string | null;
    refreshToken?: string | null;
    oauthProvider?: string | null;
    oauthId?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    profileImage: string;
    planTier: "FREE" | "PAID";
    passwordHash?: string | null;
    refreshToken?: string | null;
    oauthProvider?: string | null;
    oauthId?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    email: string;
    profileImage: string;
    planTier: "FREE" | "PAID";
    passwordHash?: string | null;
    refreshToken?: string | null;
    oauthProvider?: string | null;
    oauthId?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    profileImage: string;
    planTier: "FREE" | "PAID";
    passwordHash?: string | null;
    refreshToken?: string | null;
    oauthProvider?: string | null;
    oauthId?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    profileImage: string;
    planTier: "FREE" | "PAID";
    passwordHash?: string | null;
    refreshToken?: string | null;
    oauthProvider?: string | null;
    oauthId?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    name: string;
    email: string;
    profileImage: string;
    planTier: "FREE" | "PAID";
    passwordHash?: string | null;
    refreshToken?: string | null;
    oauthProvider?: string | null;
    oauthId?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    email: string;
    profileImage: string;
    planTier: "FREE" | "PAID";
    passwordHash?: string | null;
    refreshToken?: string | null;
    oauthProvider?: string | null;
    oauthId?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=auth.user.model.d.ts.map