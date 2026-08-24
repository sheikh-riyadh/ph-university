import z from "zod";
import { personValidationSchema } from "../../validations/common.validation";

const facultyValidationSchema = z.object({
  ...personValidationSchema,
  designation: z.string(),
  academicFaculty: z.string(),
  academicDepartment: z.string(),
});

const zodCreateFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: facultyValidationSchema,
  }),
});

const zodUpdateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: facultyValidationSchema.partial(),
  }),
});

export const facultyValidations = {
  zodCreateFacultyValidationSchema,
  zodUpdateFacultyValidationSchema,
};
