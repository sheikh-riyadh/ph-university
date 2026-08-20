import type { ZodError } from "zod";
import type { TErrorSource } from "../interface/error";

export const zodErrorHandler = (error: ZodError) => {
  const errorSources: TErrorSource = error.issues.map((issue) => ({
    path: String(issue.path.at(-1) ?? "unknown"),
    message: issue.message,
  }));

  const statusCode = 500;

  return {
    statusCode,
    message: "Hello Bangladesh",
    errorSources,
  };
};
