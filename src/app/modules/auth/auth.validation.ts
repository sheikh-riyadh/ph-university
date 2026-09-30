import z from "zod";

const zodAuthLoginValidationSchema = z.object({
  body: z.object({
    login: z.object({
      id: z.string({
        error: "id is required !",
      }),
      password: z.string({
        error: "password is required !",
      }),
    }),
  }),
});

export const authValidations = {
  zodAuthLoginValidationSchema,
};
