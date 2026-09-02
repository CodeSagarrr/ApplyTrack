import { Router } from "express";
import { createResume, getResumes, getSpecificResume, deleteResume, updateResumeDefaultStatus, updateResumeDetails, } from "../controllers/resume/resume.js";
import { requiredAuth } from "../middleware/auth.middleware.js";
import upload from "../config/Multer.js";
const router = Router();
router.use(requiredAuth);
router.post("/resumes", upload.single("file"), createResume);
router.get("/resumes", getResumes);
router.get("/resumes/:id", getSpecificResume);
router.patch("/resumes/:id/details", upload.single("file"), updateResumeDetails);
router.patch("/resumes/:id/status", updateResumeDefaultStatus);
router.delete("/resumes/:id", deleteResume);
export default router;
//# sourceMappingURL=resume.routes.js.map