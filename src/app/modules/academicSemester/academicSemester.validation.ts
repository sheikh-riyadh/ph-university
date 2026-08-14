import z from "zod";
import { Codes, Months, Name } from "./academicSemester.interface";

const academicSemesterValidationSchema = z.object({
  name: z.enum(Name),
  year: z.string(),
  code: z.enum(Codes),
  startMonth: z.enum(Months),
  endMonth: z.enum(Months),
});

const zodCreateAcademicSemesterValidationSchema = z.object({
  body: academicSemesterValidationSchema,
});

const zodUpdateAcademicSemesterValidationSchema = z.object({
  body: academicSemesterValidationSchema.partial(),
});

export const academicSemesterValidations = {
  zodCreateAcademicSemesterValidationSchema,
  zodUpdateAcademicSemesterValidationSchema,
};
