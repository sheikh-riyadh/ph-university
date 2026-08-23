import z from "zod";
import {
  personValidationSchema,
  zodGenderValidationSchema,
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

export const zodBloodGroupSchema = z.enum([
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
]);

const studentValidationSchema = z.object({
  ...personValidationSchema,
  bloodGroup: zodBloodGroupSchema,
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
});

const zodStudentQueryValidationSchema = z.object({
  query: z.object({
    search: z.string().trim().min(1).max(100).optional(),
    email: z.email().optional(),
    fields: z.string().optional(),
    bloodGroup: zodBloodGroupSchema.optional(),
    gender: zodGenderValidationSchema.optional(),
    sort: z.string().default("-createdAt"),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    page: z.coerce.number().int().min(1).default(1),
  }),
});

export const studentValidations = {
  zodCreateStudentValidationSchema,
  zodUpdateStudentValidationSchema,
  zodStudentQueryValidationSchema,
};
