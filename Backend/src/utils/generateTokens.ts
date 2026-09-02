import JWT from "jsonwebtoken";

export const generateAccesToken = (userId: string) => {
    const secret = process.env.ACCESS_TOKEN_SEC! as any
    const expireSecret = process.env.ACCESS_EXPIRE_IN as any
    return JWT.sign({ id: userId }, secret, {
        expiresIn: expireSecret
    });
};

export const generateRefreshToken = (userId : string) => {
    const secret = process.env.REFRESH_TOKEN_SEC! as any
    const expireSecret = process.env.REFRESH_EXPIRE_IN as any
    return JWT.sign({ id: userId }, secret, {
        expiresIn: expireSecret
    });
}