import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
export declare const validateSchema: (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.user.parse.d.ts.map