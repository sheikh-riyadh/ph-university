import z from "zod";
import {
  personValidationSchema,
  zodMongooseObjectIdValidationSchema,
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
    id: zodMongooseObjectIdValidationSchema,
  }),
});

const zodFacultyIdValidationSchema = z.object({
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

export const facultyValidations = {
  zodCreateFacultyValidationSchema,
  zodUpdateFacultyValidationSchema,
  zodFacultyIdValidationSchema,
};
