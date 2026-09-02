import { rateLimit, MINUTE } from "express-rate-limit";
export const AuthLimits = rateLimit({
    windowMs: 15 * MINUTE,
    max: 10,
    message: {
        success: false,
        message: "Too many login attempts. Please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false
});
export const UserProfileLimits = rateLimit({
    windowMs: 15 * MINUTE,
    max: 10,
    message: {
        success: false,
        message: "Too many requests. Please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false
});
export const aiSeviceLimits = rateLimit({
    windowMs: 15 * MINUTE,
    max: 5,
    message: {
        success: false,
        message: "Too many requests. Please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false
});
//# sourceMappingURL=rate-limiter.js.map