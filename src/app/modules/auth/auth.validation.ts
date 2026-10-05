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

const zodRefreshTokenValidationSchema = z.object({
  cookies: z.object({
    refresh_token: z.string({
      error: "refresh token is required !",
    }),
  }),
});

const zodForgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      error: "id is required !",
    }),
  }),
});
const zodResetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      error: "id is required !",
    }),
    newPassword: z.string({
      error: "password is required !!",
    }),
  }),
});

export const authValidations = {
  zodAuthLoginValidationSchema,
  zodChangePasswordValidationSchema,
  zodRefreshTokenValidationSchema,
  zodForgetPasswordValidationSchema,
  zodResetPasswordValidationSchema,
};
