import z from "zod";
import { zodMongooseObjectIdValidationSchema } from "../../validations/common.validation";

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
    id: zodMongooseObjectIdValidationSchema,
  }),
});

const zodAcademicFacultyIdValidationSchema = z.object({
  params: z.object({
    id: zodMongooseObjectIdValidationSchema.optional(),
  }),
});

export const academicFacultyValidations = {
  zodCreateAcademicFacultyValidationSchema,
  zodUpdateAcademicFacultyValidationSchema,
  zodAcademicFacultyIdValidationSchema,
};
