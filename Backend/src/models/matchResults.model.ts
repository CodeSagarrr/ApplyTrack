import mongoose from "mongoose";


const AtsIssues = {
    severity: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH"],
        default: "LOW"
    },
    category: {
        type: String,
        enum: ["Formatting", "Keywords", "Experience", "Skills", "Education", "Projects"],
        default: "Formatting"
    },
    message: {
        type: String,
        default: ""
    }
}


const suggestionsObject = {
    title: {
        type: String,
    },
    current: {
        type: String,
    },
    suggested: {
        type: String,
    },
    impact : {
        type : String,
    }
}


const MatchResultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }, 
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "resumes",
        required: true,
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "applications",
        unique: true
    },
    matchScore: {
        type: Number,
        default : 0
    },
    matched_keywords: {
        type: [String],
        default: []
    },

    missing_keywords: {
        type: [String],
        default: []
    },

    suggestions: [suggestionsObject],
    atsIssues: [AtsIssues]
}, { timestamps: true })



export const MatchResult = mongoose.model("matchresults", MatchResultSchema)