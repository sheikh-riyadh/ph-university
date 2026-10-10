import z from "zod";
import { Codes, Months, Name } from "./academicSemester.interface";
import { zodMongooseObjectIdValidationSchema } from "../../validations/common.validation";

const academicSemesterValidationSchema = z.object({
  name: z.enum(Name, {
    error: "invalid academic semester name !",
  }),
  year: z.string({
    error: "invalid academic semester year !",
  }),
  code: z.enum(Codes, {
    error: "invalid academic semester code !",
  }),
  startMonth: z.enum(Months, {
    error: "invalid academic semester start month !",
  }),
  endMonth: z.enum(Months, {
    error: "invalid academic semester end month !",
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
