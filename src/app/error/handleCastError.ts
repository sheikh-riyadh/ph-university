import type { Error } from "mongoose";
import type { TGenericErrorResponse } from "../interface/error";

export const handleCastError = (
  error: Error.CastError,
): TGenericErrorResponse => {
  const errorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  const statusCode = 404;

  return {
    statusCode,
    message: error.name,
    errorSources,
  };
};
