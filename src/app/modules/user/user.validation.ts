import z from "zod";

export const zodUserValidationSchema = z.object({
  password: z
    .string()
    .max(20, { message: "Password can not more than 20 characters long" }),
});
