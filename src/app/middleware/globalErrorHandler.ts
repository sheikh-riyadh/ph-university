import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
export const globalErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    success: false,
    message:
      error instanceof ZodError
        ? error.issues
        : error instanceof Error
          ? error.message
          : "Something went wrong!",
  });
};
