import z from "zod";
import { Codes, Months, Name } from "./academicSemester.interface";
import mongoose from "mongoose";

const academicSemesterValidationSchema = z.object({
  name: z.enum(Name, {
    error: "name is required",
  }),
  year: z.string({
    error: "year is required",
  }),
  code: z.enum(Codes, {
    error: "code is required",
  }),
  startMonth: z.enum(Months, {
    error: "start month is required",
  }),
  endMonth: z.enum(Months, {
    error: "end month is required",
  }),
});

const zodCreateAcademicSemesterValidationSchema = z.object({
  body: academicSemesterValidationSchema,
});

const zodUpdateAcademicSemesterValidationSchema = z.object({
  body: academicSemesterValidationSchema.partial(),
  params: z.object({
    id: z
      .string({
        error: "academic semester id is required !",
      })
      .refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "invalid academic semester id !",
      }),
  }),
});

const zodAcademicSemesterIdValidationSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "invalid academic semester id !",
      })
      .optional(),
  }),
});

export const academicSemesterValidations = {
  zodCreateAcademicSemesterValidationSchema,
  zodUpdateAcademicSemesterValidationSchema,
  zodAcademicSemesterIdValidationSchema,
};
