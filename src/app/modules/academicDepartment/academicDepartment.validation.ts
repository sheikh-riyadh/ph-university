import mongoose from "mongoose";
import z from "zod";

const academicDepartmentValidationSchema = z.object({
  name: z.string({
    error: "name is required",
  }),
  academicFaculty: z.string({
    error: "academic faculty is required",
  }),
});

const zodCreateAcademicDepartmentValidationSchema = z.object({
  body: academicDepartmentValidationSchema,
});

const zodUpdateAcademicDepartmentValidationSchema = z.object({
  body: academicDepartmentValidationSchema.partial(),
  params: z.object({
    id: z
      .string({
        error: "academic department id is required !",
      })
      .refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "invalid academic department id !",
      }),
  }),
});

const zodAcademicDepartmentIdValidationSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "invalid academic department id !",
      })
      .optional(),
  }),
});

export const academicDepartmentValidations = {
  zodCreateAcademicDepartmentValidationSchema,
  zodUpdateAcademicDepartmentValidationSchema,
  zodAcademicDepartmentIdValidationSchema,
};
