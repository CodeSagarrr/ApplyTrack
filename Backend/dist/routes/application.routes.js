import { Router } from "express";
import { createApplication, getFiltersApplication, getSpecificApplication, updateApplication, deleteApplication, atsService, getAllApplications, specificApplicationAtsService, } from "../controllers/application/application.js";
import { ValidateApplicationCreation, ValidateApplicationUpdation, } from "../validations/application.validate.js";
import { validateSchema } from "../middleware/auth.user.parse.js";
import { requiredAuth } from "../middleware/auth.middleware.js";
import { aiSeviceLimits } from "../middleware/rate-limiter.js";
const router = Router();
router.use(requiredAuth);
router.post("/applications", validateSchema(ValidateApplicationCreation), createApplication);
router.get("/applications/all", getAllApplications);
router.get("/applications/:applicationId", getSpecificApplication);
router.get("/applications", getFiltersApplication);
router.patch("/applications/:id", validateSchema(ValidateApplicationUpdation), updateApplication);
router.delete("/applications/:id", deleteApplication);
router.post("/applications/:applicationId/application-ats", aiSeviceLimits, specificApplicationAtsService);
router.post("/applications/:id/ats-check", aiSeviceLimits, atsService);
export default router;
//# sourceMappingURL=application.routes.js.map