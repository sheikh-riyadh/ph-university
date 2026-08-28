import z from "zod";
import {
  personValidationSchema,
  zodNameValidationSchema,
} from "../../validations/common.validation";

const adminValidationSchema = z.object({
  ...personValidationSchema,
  designation: z.string({
    error: "designation is required",
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
    adminId: z.string("admin id is required").min(1),
  }),
});

const zodAdminIdValidationSchema = z.object({
  params: z.object({
    facultyId: z.string().max(4, "Admin id is required"),
  }),
});

export const adminValidations = {
  zodCreateAdminValidationSchema,
  zodUpdateAdminValidationShema,
  zodAdminIdValidationSchema,
};
