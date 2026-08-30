import z from "zod";
import {
  personValidationSchema,
  zodNameValidationSchema,
} from "../../validations/common.validation";
import mongoose from "mongoose";

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
    id: z
      .string("admin id is required !")
      .refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "invalid admin id !",
      }),
  }),
});

const zodAdminIdValidationSchema = z.object({
  params: z.object({
    id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "invalid admin id !",
    }),
  }),
});

export const adminValidations = {
  zodCreateAdminValidationSchema,
  zodUpdateAdminValidationShema,
  zodAdminIdValidationSchema,
};
