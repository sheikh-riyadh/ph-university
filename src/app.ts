import express from "express";
import type { Application } from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { router } from "./app/routes";

export const app: Application = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// Application routes
app.use("/api/v1", router);

// Global error handler
app.use(globalErrorHandler);

// Not found handler
app.use(notFound);
