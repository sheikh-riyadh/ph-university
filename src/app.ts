import express from "express";
import type { Application } from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import { router } from "./app/routes";
import cookieParser from "cookie-parser";
import config from "./app/config";

export const app: Application = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors({ origin: [config.front_end_url] }));
app.use(cookieParser());

// Application routes
app.use("/api/v1", router);

// Global error handler
app.use(globalErrorHandler);

// Not found handler
app.use(notFound);
