import express from "express";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";

dotenv.config();
import connectDB from "./config/db.js";
import jwt from "jsonwebtoken";

import passport from "passport";
import "./config/passport.js"; // passport config

import googleAuthRoutes from "./routes/googleAuth.routes.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import adminContentRoutes from "./routes/adminContent.routes.js";
import publicContentRoutes from "./routes/publicContent.routes.js";
import roadmapRoutes from "./routes/roadmap.routes.js";   // ✅ new
// import contentRoutes from "./routes/content.routes.js";

import commentRoutes from "./routes/comment.routes.js";
import likeRoutes from "./routes/like.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import summaryRoutes from "./routes/summary.routes.js";

import paymentRoutes from "./routes/payment.routes.js";

import { requireAuth, requireUser, requireAdmin } from "./middleware/auth.middleware.js";

const app = express();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(compression());
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));

// Passport init
app.use(passport.initialize());

app.use("/auth", googleAuthRoutes);

// Routes
app.use("/auth", authRoutes);
app.use("/user", requireAuth, requireUser, userRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/contents", adminContentRoutes);
app.use("/", publicContentRoutes);


app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/activity", activityRoutes);
app.use("/summary", summaryRoutes);

// ✅ Roadmap Routes
app.use("/roadmaps", roadmapRoutes);

// Health Check
app.get("/health", (_, res) => res.json({ ok: true }));


app.use("/payment", paymentRoutes);

// Server + DB
const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to connect DB", err);
  process.exit(1);
});
