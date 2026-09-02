import z from "zod";
export declare const authUserValidate: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodOptional<z.ZodString>;
}, z.z.core.$strip>;
export declare const authUserLoginValidate: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodOptional<z.ZodString>;
}, z.z.core.$strip>;
//# sourceMappingURL=auth.user.validate.d.ts.map