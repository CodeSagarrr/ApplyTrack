import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "resumes",
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    roleTitle: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    contact: {
      type: String,
      trim: true,
      default: "",
    },
    jd_text: {
      type: String,
      trim: true,
      default: "",
    },
    salary_range: {
      type: String,
      default: "",
    },
    jd_URL: {
      type: String,
      trim: true,
      default: "",
    },
    platForm: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Screening",
        "Interview",
        "Offer",
        "Rejected",
      ],
      default: "Applied",
    },
    dateApplied: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    matchResult: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "matchresults",
    },
  },
  { timestamps: true },
);

export const Application = mongoose.model("applications", ApplicationSchema);
