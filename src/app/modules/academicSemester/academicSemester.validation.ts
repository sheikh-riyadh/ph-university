import z from "zod";
import { Codes, Months, Name } from "./academicSemester.interface";
import { zodMongooseObjectIdValidationSchema } from "../../validations/common.validation";

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
    id: zodMongooseObjectIdValidationSchema,
  }),
});

const zodAcademicSemesterIdValidationSchema = z.object({
  params: z.object({
    id: zodMongooseObjectIdValidationSchema.optional(),
  }),
});

export const academicSemesterValidations = {
  zodCreateAcademicSemesterValidationSchema,
  zodUpdateAcademicSemesterValidationSchema,
  zodAcademicSemesterIdValidationSchema,
};
