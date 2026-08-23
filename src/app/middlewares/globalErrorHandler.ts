import type { ErrorRequestHandler } from "express";
import type { TErrorSource } from "../interfaces/error";
import { ZodError } from "zod";
import config from "../config";
import { zodErrorHandler } from "../errors/handleZodError";
import { handleMongooseValidationError } from "../errors/handleMongooseValidationError";
import { Error } from "mongoose";
import { handleCastError } from "../errors/handleCastError";
import { handleDuplicateError } from "../errors/handleDuplicateError";
import { AppError } from "../errors/appError";

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  interface IdefaultResponse {
    statusCode: number;
    message: string;
  }

  const defaultResponse: IdefaultResponse = {
    statusCode: 500,
    message: "Something went wrong!",
  };

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "",
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = zodErrorHandler(error);
    defaultResponse.statusCode = simplifiedError.statusCode;
    defaultResponse.message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error instanceof Error.ValidationError) {
    const simplifiedError = handleMongooseValidationError(error);
    defaultResponse.statusCode = simplifiedError.statusCode;
    defaultResponse.message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error instanceof Error.CastError) {
    const simplifiedError = handleCastError(error);
    defaultResponse.statusCode = simplifiedError.statusCode;
    defaultResponse.message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    defaultResponse.statusCode = simplifiedError.statusCode;
    defaultResponse.message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error instanceof AppError) {
    defaultResponse.statusCode = error.statusCode;
    defaultResponse.message = error.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    defaultResponse.message = error.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  }
  res.status(defaultResponse.statusCode).json({
    success: false,
    message: defaultResponse.message,
    errorSources,
    stack: config.NODE_ENV === "development" ? error?.stack : null,
  });
};
