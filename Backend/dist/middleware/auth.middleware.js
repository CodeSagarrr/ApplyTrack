import JWT from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
export const requiredAuth = async (req, res, next) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        throw new ApiError(401, "Not authenticated");
    }
    try {
        const decoded = JWT.verify(token, process.env.ACCESS_TOKEN_SEC);
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        next(Error);
    }
};
//# sourceMappingURL=auth.middleware.js.map