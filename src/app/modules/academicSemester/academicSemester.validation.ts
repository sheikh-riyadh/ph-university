import z from "zod";
import { Code, Month, Name } from "./academicSemester.interface";

const zodAcademicSemesterSchema = z.object({
  body: z.object({
    name: z.enum(Name),
    year: z.date(),
    code: z.enum(Code),
    startMonth: z.enum(Month),
    endMonth: z.enum(Month),
  }),
});

export const zodAcademicSemesterValidations = {
  zodAcademicSemesterSchema,
};
