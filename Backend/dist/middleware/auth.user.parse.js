import { ZodType } from "zod";
import ApiError from "../utils/ApiError.js";
export const validateSchema = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    }
    catch (error) {
        const err = error?.issues[0].message;
        console.log(err);
        throw new ApiError(400, err);
    }
};
//# sourceMappingURL=auth.user.parse.js.map