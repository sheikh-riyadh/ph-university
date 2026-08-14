import z from "zod";
import type { TGuardian, TLocalGuardian, TUserName } from "./student.interface";

export const zodUserNameValidationSchema: z.ZodType<TUserName> = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
});

export const zodGuardianValidationSchema: z.ZodType<TGuardian> = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

export const zodStudentGenderValidationSchema = z.enum(["male", "female"]);

export const zodLocalGuardianValidationSchema: z.ZodType<TLocalGuardian> =
  z.object({
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
  student: z.object({
    name: zodUserNameValidationSchema,
    gender: zodStudentGenderValidationSchema,
    dateOfBirth: z.string().optional(),
    email: z.email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: zodBloodGroupSchema,
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: zodGuardianValidationSchema,
    localGuardian: zodLocalGuardianValidationSchema,
    admissionSemester: z.string(),
    profileImage: z.string(),
  }),
});

const zodCreateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: studentValidationSchema,
  }),
});

const zodUpdateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: studentValidationSchema.partial(),
  }),
});

export const studentValidations = {
  zodCreateStudentValidationSchema,
  zodUpdateStudentValidationSchema,
};
