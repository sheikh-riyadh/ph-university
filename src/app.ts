import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";

export const app: Application = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// Application routes
app.use("/api/v1/user", userRoutes);

app.get("/", async (req: Request, res: Response) => {
  res.send(`Welcome to ph university`);
});
