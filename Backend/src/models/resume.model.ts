import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    fileName: {
        type: String,
        trim: true
    },
    versionName: {
        type: String,
        required: false,
        trim: true
    },
    public_id: {
        type: String,
        required: true
    },
    file_URL: {
        type: String,
        required: true,
    },
    parsedText: {
        type: String,
        trim: true,
        default: ""
    },
    parsingStatus: {
        type: String,
        enum: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"],
        default: "PENDING"
    },
    isDefault : {
        type: Boolean,
        default: false
    },
    ats_score: {
        type: Number,
        default: 0
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
}, { timestamps: true });

export const Resume = mongoose.model("resumes", ResumeSchema);