import z from "zod";
import { Code, Month, Name } from "./academicSemester.interface";

const zodAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(Name),
    year: z.string(),
    code: z.enum(Code),
    startMonth: z.enum(Month),
    endMonth: z.enum(Month),
  }),
});

export const academicSemesterValidations = {
  zodAcademicSemesterValidationSchema,
};
