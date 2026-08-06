import type { Request, Response, NextFunction } from "express";
export const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).json({
    success: false,
    message: error instanceof Error ? error.message : "Something went wrong!",
  });
  next(error);
};
