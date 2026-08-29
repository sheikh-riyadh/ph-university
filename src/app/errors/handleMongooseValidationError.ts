import type { Error } from "mongoose";
import type { TErrorSource, TGenericErrorResponse } from "../interfaces/error";

export const handleMongooseValidationError = (
  error: Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TErrorSource = Object.values(error.errors).map(
    (value: Error.ValidatorError | Error.CastError) => {
      return {
        path: value.path,
        message: value.message,
      };
    },
  );
  const statusCode = 400;

  return {
    statusCode,
    message: errorSources[0]?.message || "Something went wrong !",
    errorSources,
  };
};
