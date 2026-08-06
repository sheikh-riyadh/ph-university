import express from "express";
import type { Application } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

export const app: Application = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// Application routes
app.use("/api/v1/user", userRoutes);

// Global error handling start from herer
app.use(globalErrorHandler);
