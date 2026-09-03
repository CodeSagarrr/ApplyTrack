import mongoose, { type ObjectId } from "mongoose";
import bcrypt from "bcrypt";

const RegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    passwordHash: {
        type: String,
        required: function (this: { oauthProvider: string | null }) {
            return !this.oauthProvider;
        }
    },

    profileImage: {
        type: String,
        default: ""
    },

    // Login session
    refreshToken: {
        type: String,
        default: null
    },

    // OAuth users
    oauthProvider: {
        type: String,
        default: null
    },

    oauthId: {
        type: String,
        default: null
    },

    planTier: {
        type: String,
        enum: ["FREE", "PAID"],
        default: "FREE"
    },
}, {
    timestamps: true
});

RegisterSchema.pre('save', async function () {
    if (!this.isModified("passwordHash") || !this.passwordHash) {
        return;
    }
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
})

export const User = mongoose.model('users', RegisterSchema);