import type { Error } from "mongoose";
import type { TErrorSource } from "../interface/error";

export const handleMongooseValidationError = (error: Error.ValidationError) => {
  const errorSources: TErrorSource = Object.values(error.errors).map(
    (value: Error.ValidatorError | Error.CastError) => {
      return {
        path: value.path,
        message: value.message,
      };
    },
  );
  const statusCode = 500;

  return {
    statusCode,
    message: "Hello Bangladesh",
    errorSources,
  };
};
