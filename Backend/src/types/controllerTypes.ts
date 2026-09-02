import type { Request } from "express";

export interface AuthUserId extends Request {
    userId?: string
}