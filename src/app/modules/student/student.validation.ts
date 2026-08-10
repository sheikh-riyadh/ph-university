import z from "zod";
import type { TGuardian, TLocalGuardian, TUserName } from "./student.interface";

export const zodUserNameSchema: z.ZodType<TUserName> = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
});

export const zodGuardianSchema: z.ZodType<TGuardian> = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

export const zodStudentGenderSchema = z.enum(["male", "female"]);

export const zodLocalGuardianSchema: z.ZodType<TLocalGuardian> = z.object({
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

const zodStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: zodUserNameSchema,
      gender: zodStudentGenderSchema,
      dateOfBirth: z.date().optional(),
      email: z.email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: zodBloodGroupSchema,
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: zodGuardianSchema,
      localGuardian: zodLocalGuardianSchema,
      profileImage: z.string(),
    }),
  }),
});

export const studentValidations = {
  zodStudentValidationSchema,
};
