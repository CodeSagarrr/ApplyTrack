import { Router } from "express";
import {
  CurrentUser,
  createUserProfile,
  getUserProfile,
} from "../controllers/user/user.js";
import { requiredAuth } from "../middleware/auth.middleware.js";
import { validateSchema } from "../middleware/auth.user.parse.js";
import { userProfileSchema } from "../validations/user.profile.validate.js";
import { UserProfileLimits } from "../middleware/rate-limiter.js";
import upload from "../config/Multer.js";

const router = Router();

router.use(requiredAuth)

router.get("/me" , CurrentUser);
router.patch(
  "/profile",
  validateSchema(userProfileSchema),
  upload.single("profileImage"),
  createUserProfile,
);
router.get("/profile", getUserProfile);

export default router;
