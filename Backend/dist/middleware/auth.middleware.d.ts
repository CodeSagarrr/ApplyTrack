import type { NextFunction, Request, Response } from "express";
interface AuthRequest extends Request {
    userId?: string;
}
export declare const requiredAuth: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=auth.middleware.d.ts.map