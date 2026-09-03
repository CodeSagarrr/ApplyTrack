import dns from 'dns'
dns.setServers(['1.1.1.1', '8.8.8.8']);
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/Database.js"
import cors from "cors";
import cloudinary from "cloudinary";

import authRoutes from "./routes/auth.user.routes.js"
import userRoutes from "./routes/user.routes.js"
import resumeRoutes from "./routes/resume.routes.js"
import applicationRoutes from "./routes/application.routes.js"
import matchRoutes from "./routes/match.routes.js"
import dashboardRoutes from "./routes/dashboard.route.js"
import { errorHandler } from "./utils/GlobalError.js"


dotenv.config();
const app = express();
connectDB();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
    secure: true,
})

const corsOptions = {
    origin: process.env.FRONTEND_URL || "https://apply-track-tau.vercel.app",
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/v1", applicationRoutes);
app.use("/api/v1", resumeRoutes);
app.use("/api/v1" , matchRoutes)
app.use("/api/dashboard" , dashboardRoutes)

app.use(errorHandler);
export default app 