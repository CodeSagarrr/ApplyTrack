import mongoose from "mongoose";
const MatchJobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "resumes",
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "applications",
    },
    status: {
        type: String,
        enum: [
            "QUEUED",
            "PROCESSING",
            "COMPLETED",
            "FAILED"
        ],
        default: "QUEUED"
    },
    matchResult: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "matchresults"
    },
    error: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});
export const MatchJob = mongoose.model("matchjob", MatchJobSchema);
//# sourceMappingURL=matchJob.model.js.map