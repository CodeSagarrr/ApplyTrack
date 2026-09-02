import type { NextFunction, Request, Response } from "express";
export declare const register: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const Refresh: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const Logout: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GoogleLogin: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const githubAuth: (req: Request, res: Response) => void;
export declare const GithubLoginCallback: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.user.d.ts.map