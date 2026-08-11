import z from "zod";
import { Codes, Months, Name } from "./academicSemester.interface";

const zodAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(Name),
    year: z.string(),
    code: z.enum(Codes),
    startMonth: z.enum(Months),
    endMonth: z.enum(Months),
  }),
});

const zodAcademicSemesterUpdateValidationSchema = z.object({
  body: z.object({
    name: z.enum(Name).optional(),
    year: z.string().optional(),
    code: z.enum(Codes).optional(),
    startMonth: z.enum(Months).optional(),
    endMonth: z.enum(Months).optional(),
  }),
});

export const academicSemesterValidations = {
  zodAcademicSemesterValidationSchema,
  zodAcademicSemesterUpdateValidationSchema,
};
