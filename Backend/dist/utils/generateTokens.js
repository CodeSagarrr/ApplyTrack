import JWT from "jsonwebtoken";
export const generateAccesToken = (userId) => {
    const secret = process.env.ACCESS_TOKEN_SEC;
    const expireSecret = process.env.ACCESS_EXPIRE_IN;
    return JWT.sign({ id: userId }, secret, {
        expiresIn: expireSecret
    });
};
export const generateRefreshToken = (userId) => {
    const secret = process.env.REFRESH_TOKEN_SEC;
    const expireSecret = process.env.REFRESH_EXPIRE_IN;
    return JWT.sign({ id: userId }, secret, {
        expiresIn: expireSecret
    });
};
//# sourceMappingURL=generateTokens.js.map