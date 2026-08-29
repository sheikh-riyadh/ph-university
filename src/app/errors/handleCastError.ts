import type { Error } from "mongoose";
import type { TGenericErrorResponse } from "../interfaces/error";

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
    message: errorSources[0]?.message || "Something went wrong !",
    errorSources,
  };
};
