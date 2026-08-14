import z from "zod";

const academicDepartmentValidationSchema = z.object({
  name: z.string(),
  academicFaculty: z.string(),
});

const zodCreateAcademicDepartmentValidationSchema = z.object({
  body: academicDepartmentValidationSchema,
});

const zodUpdateAcademicDepartmentValidationSchema = z.object({
  body: academicDepartmentValidationSchema.partial(),
});

export const academicDepartmentValidations = {
  zodCreateAcademicDepartmentValidationSchema,
  zodUpdateAcademicDepartmentValidationSchema,
};
