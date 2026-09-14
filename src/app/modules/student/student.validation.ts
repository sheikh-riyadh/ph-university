import z from "zod";
import {
  personValidationSchema,
  zodMongooseObjectIdValidationSchema,
  zodNameValidationSchema,
} from "../../validations/common.validation";

export const zodGuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

export const zodLocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const studentValidationSchema = z.object({
  ...personValidationSchema,
  guardian: zodGuardianValidationSchema,
  localGuardian: zodLocalGuardianValidationSchema,
  admissionSemester: z.string(),
  academicDepartment: z.string(),
});

const zodCreateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: studentValidationSchema,
  }),
});

const zodUpdateStudentValidationSchema = z.object({
  body: z.object({
    student: studentValidationSchema
      .extend({
        name: zodNameValidationSchema.partial(),
        guardian: zodGuardianValidationSchema.partial(),
        localGuardian: zodLocalGuardianValidationSchema.partial(),
      })
      .partial(),
  }),
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

const zodStudentIdValidationSchema = z.object({
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

export const studentValidations = {
  zodCreateStudentValidationSchema,
  zodUpdateStudentValidationSchema,
  zodStudentIdValidationSchema,
};
