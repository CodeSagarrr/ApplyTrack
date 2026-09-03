import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt"
import { User } from "../../models/auth.user.model.js";
import ApiError from "../../utils/ApiError.js";
import { generateAccesToken, generateRefreshToken } from "../../utils/generateTokens.js"
import { OAuth2Client } from "google-auth-library";
import JWT from "jsonwebtoken"
import axios from "axios"

interface Token extends Request {
    token?: string
}

const cookiesOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(409, "User already exists");
        }

        const newUser = new User({
            name,
            email,
            passwordHash: password
        });

        const accesstoken = generateAccesToken(newUser._id.toString());
        const refreshtoken = generateRefreshToken(newUser._id.toString());

        const hashedRefreshToken = await bcrypt.hash(refreshtoken, 10)

        newUser.refreshToken = hashedRefreshToken;
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully", data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                planTier: newUser.planTier,
                accessToken: accesstoken
            }
        });

    } catch (error) {
        next(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new ApiError(404, "User not found")
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.passwordHash!);
        if (!isPasswordCorrect) {
            throw new ApiError(401, "Invalid credential")
        }

        const accesstoken = generateAccesToken(existingUser._id.toString());
        const refreshtoken = generateRefreshToken(existingUser._id.toString());

        const hashedRefreshToken = await bcrypt.hash(refreshtoken, 10);

        existingUser.refreshToken = hashedRefreshToken;
        await existingUser.save();

        return res.cookie("accessToken", accesstoken, { ...cookiesOption, maxAge: 15 * 60 * 1000 })
            .cookie("refreshToken", refreshtoken, { ...cookiesOption, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .json({ success: true, message: "Token refreshed" });
    } catch (error: any) {
        next(error)
    }
}

export const Refresh = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.refreshToken;
    if (!token) {
        throw new ApiError(401, "No Refresh Token")
    }

    try {
        let decoded: { id: string };

        decoded = JWT.verify(token, process.env.REFRESH_TOKEN_SEC!) as { id: string }

        const user = await User.findById(decoded.id)
        if (!user) {
            throw new ApiError(401, "Invalid token")
        }

        const existingRefreshToken = user.refreshToken as string
        const isValid = await bcrypt.compare(token, existingRefreshToken)
        if (!isValid) {
            throw new ApiError(401, "Invalid refresh token")
        }

        const accesstoken = generateAccesToken(user._id.toString());
        const refreshtoken = generateRefreshToken(user._id.toString());

        const hashedRefreshToken = await bcrypt.hash(refreshtoken, 10);

        user.refreshToken = hashedRefreshToken;
        await user.save();

        return res.cookie("accessToken", accesstoken, { ...cookiesOption, maxAge: 15 * 60 * 1000 })
            .cookie("refreshToken", refreshtoken, { ...cookiesOption, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .json({ success: true, message: "Token refreshed" });
    } catch (error) {
        next(error)
    }
}

export const Logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        throw new ApiError(401, "No Refresh Token")
    }

    if (refreshToken) {
        await User.updateOne({ refreshToken }, { $unset: { refreshToken: 1 } })
    }

    return res.clearCookie("accessToken", cookiesOption)
        .clearCookie("refreshToken", cookiesOption)
        .json({ success: true, message: "Logout successfully" });
}

// For oauth

export const GoogleLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.body as { token: string }
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID!);

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID!
        });

        const payLoad = ticket.getPayload();

        let user = await User.findOne({ email: payLoad?.email as string });

        if (!user) {
            user = await User.create({
                name: payLoad?.name as string,
                email: payLoad?.email as string,
                profileImage: payLoad?.picture as string,
                oauthProvider: "google",
                oauthId: payLoad?.sub as string,
            });
        } else {
            user.oauthProvider = "google";
            user.oauthId = payLoad?.sub as string;
            user.profileImage = payLoad?.picture as string;
        }

        const accesstoken = generateAccesToken(user._id.toString());
        const refreshtoken = generateRefreshToken(user._id.toString());

        const hashedRefreshToken = await bcrypt.hash(refreshtoken, 10);

        user.refreshToken = hashedRefreshToken;
        await user.save();

        return res.cookie("accessToken", accesstoken, { ...cookiesOption, maxAge: 15 * 60 * 1000 })
            .cookie("refreshToken", refreshtoken, { ...cookiesOption, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        next(error);
    }
}


export const githubAuth = (
    req: Request,
    res: Response
): void => {
    const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        redirect_uri: process.env.GITHUB_CALLBACK_URL!,
        scope: "user:email",
    });

    res.redirect(
        `https://github.com/login/oauth/authorize?${params}`
    );
};

export const GithubLoginCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { code } = req.query;

        if (!code || typeof code !== "string") {
            throw new ApiError(400, "Authorization code is required.");
        }

        // Exchange code for access token
        const { data } = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: process.env.GITHUB_CLIENT_ID!,
                client_secret: process.env.GITHUB_CLIENT_SECRET!,
                code,
            },
            {
                headers: {
                    Accept: "application/json",
                },
            }
        );

        if (!data.access_token) {
            throw new ApiError(401, "Failed to get GitHub access token.");
        }

        const headers = {
            Authorization: `Bearer ${data.access_token}`,
        };

        // Fetch profile & email simultaneously
        const [
            { data: githubUser },
            { data: emails }
        ] = await Promise.all([
            axios.get(
                "https://api.github.com/user",
                { headers }
            ),
            axios.get(
                "https://api.github.com/user/emails",
                { headers }
            )
        ]);

        const primaryEmail = emails.find(
            (email: any) =>
                email.primary && email.verified
        );

        if (!primaryEmail) {
            throw new ApiError(
                400,
                "No verified email found."
            );
        }

        let user = await User.findOne({
            email: primaryEmail.email,
        });

        if (!user) {
            user = await User.create({
                name:
                    githubUser.name ??
                    githubUser.login,
                email: primaryEmail.email,
                profileImage:
                    githubUser.avatar_url,
                oauthProvider: "github",
                oauthId:
                    githubUser.id.toString(),
            });
        } else {
            user.oauthProvider = "github";
            user.oauthId =
                githubUser.id.toString();
            user.profileImage =
                githubUser.avatar_url;
        }

        const accessToken =
            generateAccesToken(
                user._id.toString()
            );

        const refreshToken =
            generateRefreshToken(
                user._id.toString()
            );

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        user.refreshToken = hashedRefreshToken;

        await user.save();

        res.cookie(
            "accessToken",
            accessToken,
            {
                ...cookiesOption,
                maxAge: 15 * 60 * 1000,
            }
        );

        res.cookie(
            "refreshToken",
            refreshToken,
            {
                ...cookiesOption,
                maxAge:
                    7 * 24 * 60 * 60 * 1000,
            }
        );

        return res.redirect(
            `${process.env.CLIENT_URL}/`
        );

    } catch (error) {
        next(error);
    }
}