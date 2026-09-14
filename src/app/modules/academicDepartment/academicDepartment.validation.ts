import z from "zod";
import { zodMongooseObjectIdValidationSchema } from "../../validations/common.validation";

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
    id: zodMongooseObjectIdValidationSchema,
  }),
});

const zodAcademicDepartmentIdValidationSchema = z.object({
  params: z.object({
    id: zodMongooseObjectIdValidationSchema.optional(),
  }),
});

export const academicDepartmentValidations = {
  zodCreateAcademicDepartmentValidationSchema,
  zodUpdateAcademicDepartmentValidationSchema,
  zodAcademicDepartmentIdValidationSchema,
};
