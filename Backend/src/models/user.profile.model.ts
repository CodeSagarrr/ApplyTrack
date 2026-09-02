import mongoose from "mongoose";

const Links = {
    github: {
        type: String,
        trim: true,
        default: ""
    },
    linkedin: {
        type: String,
        trim: true,
        default: ""
    },
    portfolio: {
        type: String,
        trim: true,
        default: ""
    },
    twitter: {
        type: String,
        trim: true,
        default: ""
    },
    leetcode: {
        type: String,
        trim: true,
        default: ""
    },
}

const UserProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    headline: {
        type: String,
        trim: true,
        default: ""
    },
    collegeName: {
        type: String,
        default: ""
    },
    about: {
        type: String,
        trim: true,
        default: ""
    },
    profileImage: {
        type: String,
        trim: true,
        default: ""
    },
    phone: {
        type: String,
        trim: true,
        default: ""
    },
    location: {
        city: {
            type: String,
            trim: true,
            default: ""
        },
        state: {
            type: String,
            trim: true,
            default: ""
        },
        country: {
            type: String,
            trim: true,
            default: ""
        }
    },
    socialLinks: Links,
    skills: [{
        type: String,
        default: ""
    }],
    preferredRole: {
        type: String,
        trim: true,
        default: ""
    },
    yearsOfExperience: {
        type: Number,
        trim: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const UserProfile = mongoose.model("profile" , UserProfileSchema)