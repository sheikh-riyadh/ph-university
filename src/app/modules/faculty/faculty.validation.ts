import z from "zod";
import {
  personValidationSchema,
  zodNameValidationSchema,
} from "../../validations/common.validation";

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
    faculty: facultyValidationSchema
      .extend({
        name: zodNameValidationSchema.partial(),
      })
      .partial(),
  }),
  params: z.object({
    facultyId: z.string("Faculty id is required").min(1),
  }),
});

const zodFacultyIdValidationSchema = z.object({
  params: z.object({
    facultyId: z.string().max(6, "Faculty id is required"),
  }),
});

export const facultyValidations = {
  zodCreateFacultyValidationSchema,
  zodUpdateFacultyValidationSchema,
  zodFacultyIdValidationSchema,
};
