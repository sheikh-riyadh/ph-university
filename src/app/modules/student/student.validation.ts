import z from "zod";
import {
  personValidationSchema,
  zodNameValidationSchema,
} from "../../validations/common.validation";
import mongoose from "mongoose";

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
    id: z
      .string({
        error: "student id is required !",
      })
      .refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "invalid student id !",
      }),
  }),
});

const zodStudentIdValidationSchema = z.object({
  params: z.object({
    id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "invalid student id !",
    }),
  }),
});

export const studentValidations = {
  zodCreateStudentValidationSchema,
  zodUpdateStudentValidationSchema,
  zodStudentIdValidationSchema,
};
