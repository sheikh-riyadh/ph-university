import mongoose from "mongoose";
import z from "zod";

const academicFacultyValidationSchema = z.object({
  name: z.string({
    error: "academic faculty name is required !",
  }),
});

const zodCreateAcademicFacultyValidationSchema = z.object({
  body: academicFacultyValidationSchema,
});

const zodUpdateAcademicFacultyValidationSchema = z.object({
  body: academicFacultyValidationSchema.partial(),
  params: z.object({
    id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "invalid academic faculty id",
    }),
  }),
});

const zodGetAcademicFacultyValidationSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "invalid academic faculty id",
      })
      .optional(),
  }),
});

export const academicFacultyValidations = {
  zodCreateAcademicFacultyValidationSchema,
  zodUpdateAcademicFacultyValidationSchema,
  zodGetAcademicFacultyValidationSchema,
};
