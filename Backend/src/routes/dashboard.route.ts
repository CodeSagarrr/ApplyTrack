import { Router } from "express";
import { requiredAuth } from "../middleware/auth.middleware.js";
import { GetMatrixData } from "../controllers/dashboard/dashboard.js";

const router = Router();

router.get("/summary" , requiredAuth , GetMatrixData)

export default router