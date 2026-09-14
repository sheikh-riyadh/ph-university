import z from "zod";
import {
  personValidationSchema,
  zodMongooseObjectIdValidationSchema,
  zodNameValidationSchema,
} from "../../validations/common.validation";

const adminValidationSchema = z.object({
  ...personValidationSchema,
  designation: z.string({
    error: "designation is required !",
  }),
});

const zodCreateAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: adminValidationSchema,
  }),
});

const zodUpdateAdminValidationShema = z.object({
  body: z.object({
    admin: adminValidationSchema
      .extend({
        name: zodNameValidationSchema.partial(),
      })
      .partial(),
  }),
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

const zodAdminIdValidationSchema = z.object({
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

export const adminValidations = {
  zodCreateAdminValidationSchema,
  zodUpdateAdminValidationShema,
  zodAdminIdValidationSchema,
};
