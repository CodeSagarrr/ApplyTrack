import JWT from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import type { NextFunction, Request, Response } from "express";

interface AuthRequest extends Request{
    userId? : string
}

export const requiredAuth = async(req : AuthRequest , res : Response, next : NextFunction) => {
    const token = req.cookies?.accessToken;
    if(!token){
        throw new ApiError(401 , "Not authenticated")
    }
    try {
        const decoded = JWT.verify(token , process.env.ACCESS_TOKEN_SEC!) as { id : string };
        req.userId = decoded.id;
        next();
    } catch (error) {
        next(Error)
    }
}
