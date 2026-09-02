import mongoose from "mongoose";
export declare const UserProfile: mongoose.Model<{
    profileImage: string;
    createdAt: NativeDate;
    user: mongoose.Types.ObjectId;
    headline: string;
    collegeName: string;
    about: string;
    phone: string;
    skills: string[];
    preferredRole: string;
    yearsOfExperience: number;
    socialLinks?: {
        github: string;
        linkedin: string;
        portfolio: string;
        twitter: string;
        leetcode: string;
    } | null;
    location?: {
        city: string;
        state: string;
        country: string;
    } | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    profileImage: string;
    createdAt: NativeDate;
    user: mongoose.Types.ObjectId;
    headline: string;
    collegeName: string;
    about: string;
    phone: string;
    skills: string[];
    preferredRole: string;
    yearsOfExperience: number;
    socialLinks?: {
        github: string;
        linkedin: string;
        portfolio: string;
        twitter: string;
        leetcode: string;
    } | null;
    location?: {
        city: string;
        state: string;
        country: string;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    profileImage: string;
    createdAt: NativeDate;
    user: mongoose.Types.ObjectId;
    headline: string;
    collegeName: string;
    about: string;
    phone: string;
    skills: string[];
    preferredRole: string;
    yearsOfExperience: number;
    socialLinks?: {
        github: string;
        linkedin: string;
        portfolio: string;
        twitter: string;
        leetcode: string;
    } | null;
    location?: {
        city: string;
        state: string;
        country: string;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    profileImage: string;
    createdAt: NativeDate;
    user: mongoose.Types.ObjectId;
    headline: string;
    collegeName: string;
    about: string;
    phone: string;
    skills: string[];
    preferredRole: string;
    yearsOfExperience: number;
    socialLinks?: {
        github: string;
        linkedin: string;
        portfolio: string;
        twitter: string;
        leetcode: string;
    } | null;
    location?: {
        city: string;
        state: string;
        country: string;
    } | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    profileImage: string;
    createdAt: NativeDate;
    user: mongoose.Types.ObjectId;
    headline: string;
    collegeName: string;
    about: string;
    phone: string;
    skills: string[];
    preferredRole: string;
    yearsOfExperience: number;
    socialLinks?: {
        github: string;
        linkedin: string;
        portfolio: string;
        twitter: string;
        leetcode: string;
    } | null;
    location?: {
        city: string;
        state: string;
        country: string;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    profileImage: string;
    createdAt: NativeDate;
    user: mongoose.Types.ObjectId;
    headline: string;
    collegeName: string;
    about: string;
    phone: string;
    skills: string[];
    preferredRole: string;
    yearsOfExperience: number;
    socialLinks?: {
        github: string;
        linkedin: string;
        portfolio: string;
        twitter: string;
        leetcode: string;
    } | null;
    location?: {
        city: string;
        state: string;
        country: string;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    profileImage: string;
    createdAt: NativeDate;
    user: mongoose.Types.ObjectId;
    headline: string;
    collegeName: string;
    about: string;
    phone: string;
    skills: string[];
    preferredRole: string;
    yearsOfExperience: number;
    socialLinks?: {
        github: string;
        linkedin: string;
        portfolio: string;
        twitter: string;
        leetcode: string;
    } | null;
    location?: {
        city: string;
        state: string;
        country: string;
    } | null;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    profileImage: string;
    createdAt: NativeDate;
    user: mongoose.Types.ObjectId;
    headline: string;
    collegeName: string;
    about: string;
    phone: string;
    skills: string[];
    preferredRole: string;
    yearsOfExperience: number;
    socialLinks?: {
        github: string;
        linkedin: string;
        portfolio: string;
        twitter: string;
        leetcode: string;
    } | null;
    location?: {
        city: string;
        state: string;
        country: string;
    } | null;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=user.profile.model.d.ts.map