import { Router } from "express";
import { createMatch, getMatchJobId } from "../controllers/match/match.js";
import { requiredAuth } from "../middleware/auth.middleware.js";
import { MatchJobDescription } from "../validations/match.validation.js";
import { validateSchema } from "../middleware/auth.user.parse.js"

const router = Router();

router.use(requiredAuth)

router.post("/match", validateSchema(MatchJobDescription), createMatch);
router.get("/match/:jobId", getMatchJobId);

export default router;
