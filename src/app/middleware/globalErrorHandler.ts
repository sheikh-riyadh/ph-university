import type { ErrorRequestHandler } from "express";
import type { TErrorSource } from "../interface/error";
import { ZodError } from "zod";
import config from "../config";
import { zodErrorHandler } from "../error/handleZodError";
import { handleMongooseValidationError } from "../error/handleMongooseValidationError";
import { Error } from "mongoose";

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  // eslint-disable-next-line prefer-const
  let statusCode = error.statusCode || 500;
  // eslint-disable-next-line prefer-const
  let message = error.message || "Something went wrong!";

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "",
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = zodErrorHandler(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error instanceof Error.ValidationError) {
    const simplifiedError = handleMongooseValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? error?.stack : null,
  });
};
