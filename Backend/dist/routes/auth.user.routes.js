import { login, Logout, Refresh, register, GoogleLogin, GithubLoginCallback, githubAuth, } from "../controllers/auth/auth.user.js";
import { authUserValidate, authUserLoginValidate, } from "../validations/auth.user.validate.js";
import { validateSchema } from "../middleware/auth.user.parse.js";
import { Router } from "express";
import { AuthLimits } from "../middleware/rate-limiter.js";
const router = Router();
router.post("/register", AuthLimits, validateSchema(authUserValidate), register);
router.post("/refresh", Refresh);
router.post("/login", AuthLimits, validateSchema(authUserLoginValidate), login);
router.post("/google", AuthLimits, GoogleLogin);
router.get("/github", AuthLimits, githubAuth);
router.get("/github/callback", AuthLimits, GithubLoginCallback);
router.post("/logout", Logout);
export default router;
//# sourceMappingURL=auth.user.routes.js.map