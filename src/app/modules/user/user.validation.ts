import z from "zod";
import { zodMongooseObjectIdValidationSchema } from "../../validations/common.validation";
import { STATUS } from "./user.constant";

const zodUserValidationSchema = z.object({
  password: z
    .string()
    .max(20, { message: "Password can not more than 20 characters long" }),
});

const zodUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(Object.values(STATUS) as [string, ...string[]], {
      error: "invalid status !",
    }),
  }),
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

export const userValidations = {
  zodUserValidationSchema,
  zodUserStatusValidationSchema,
};
