import z, { trim } from "zod";
export const authUserValidate = z.object({
    name: z.string({ error: "Name is required" })
        .trim()
        .min(1, { error: "Name should be atleast 1 character" }),
    email: z.string({ error: "Email is required" })
        .trim()
        .email(),
    password: z.string({ error: "Password is required " })
        .trim()
        .min(6, { error: "Password should be atleast 6 character" })
        .max(10, { error: "Password should be atmost 10 character" })
        .optional()
});
export const authUserLoginValidate = z.object({
    email: z.string({ error: "Email is required" })
        .trim()
        .email(),
    password: z.string({ error: "Password is required " })
        .trim()
        .min(6, { error: "Password should be atleast 6 character" })
        .max(10, { error: "Password should be atmost 10 character" })
        .optional()
});
//# sourceMappingURL=auth.user.validate.js.map