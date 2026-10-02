import z from "zod";

const zodAuthLoginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      error: "id is required !",
    }),
    password: z.string({
      error: "password is required !",
    }),
  }),
});

const zodChangePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      error: "id is required !",
    }),
    newPassword: z.string({
      error: "password is required !",
    }),
  }),
});

export const authValidations = {
  zodAuthLoginValidationSchema,
  zodChangePasswordValidationSchema,
};
