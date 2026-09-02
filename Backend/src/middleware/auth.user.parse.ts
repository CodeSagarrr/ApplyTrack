import type {Request , Response, NextFunction } from "express";
import { ZodType } from "zod";
import ApiError from "../utils/ApiError.js";

export const validateSchema = (schema : ZodType ) => async (req:Request , res: Response ,next : NextFunction) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        (req as any).body = parsedBody;
        next()   
    } catch (error : any) {
        const err = error?.issues[0].message
        console.log(err)
        throw new ApiError(400, err)
    }
}