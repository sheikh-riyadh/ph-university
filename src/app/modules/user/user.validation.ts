import z from "zod";

const zodUserValidationSchema = z.object({
  password: z
    .string()
    .max(20, { message: "Password can not more than 20 characters long" }),
});

export const userValidations = {
  zodUserValidationSchema,
};
