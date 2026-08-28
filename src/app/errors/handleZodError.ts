import type { ZodError } from "zod";
import type { TErrorSource, TGenericErrorResponse } from "../interfaces/error";

export const zodErrorHandler = (error: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSource = error.issues.map((issue) => ({
    path: String(issue.path.at(-1) ?? "unknown"),
    message: issue.message,
  }));

  const statusCode = 404;

  return {
    statusCode,
    message: errorSources[0]?.message || "",
    errorSources,
  };
};
