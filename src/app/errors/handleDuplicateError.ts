import type { MongoServerError } from "mongodb";
import type { TGenericErrorResponse } from "../interfaces/error";

export const handleDuplicateError = (
  error: MongoServerError,
): TGenericErrorResponse => {
  const message =
    error.message
      .match(/dup key:\s*(\{.*\})/)?.[1]
      ?.concat(" is already exists") || "";

  const errorSources = [
    {
      path: "",
      message,
    },
  ];

  const statusCode = 409;

  return {
    statusCode,
    message,
    errorSources,
  };
};
