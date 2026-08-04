import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";

export const app: Application = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.send(`Welcome to ph university`);
});
