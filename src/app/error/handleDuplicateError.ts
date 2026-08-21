import type { MongoServerError } from "mongodb";
import type { TGenericErrorResponse } from "../interface/error";

export const handleDuplicateError = (
  error: MongoServerError,
): TGenericErrorResponse => {
  const message =
    error.message
      .match(/dup key:\s*(\{.*\})/)?.[1]
      ?.concat(" is already exsits") || "";

  const errorSources = [
    {
      path: "",
      message,
    },
  ];

  const statusCode = 500;

  return {
    statusCode,
    message,
    errorSources,
  };
};
