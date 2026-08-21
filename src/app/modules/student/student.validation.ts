import z from "zod";

export const zodUserNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
});

export const zodGuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

export const zodStudentGenderValidationSchema = z.enum(["male", "female"]);

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
  academicDepartment: z.string(),
  profileImage: z.string(),
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
        name: zodUserNameValidationSchema.partial(),
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
    gender: zodStudentGenderValidationSchema.optional(),
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
