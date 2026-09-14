import z from "zod";
import { zodMongooseObjectIdValidationSchema } from "../../validations/common.validation";
import { SemesterRegistrationStatus } from "./semesterRegistration.interface";

const semesterRegistrationValidation = z.object({
  academicSemester: zodMongooseObjectIdValidationSchema,
  status: z.enum(SemesterRegistrationStatus, {
    error: "invalid status. please provide valid registration status !",
  }),
  startDate: z.string({
    error: "invalid start date !",
  }),
  endDate: z.string({
    error: "invalid end date !",
  }),
  minCredit: z.number().optional(),
  maxCredit: z.number().optional(),
});

const zodCreateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    semesterRegistration: semesterRegistrationValidation,
  }),
});

const zodSemesterRegistrationIdValidationSchema = z.object({
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

const zodUpdateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    semesterRegistration: semesterRegistrationValidation.partial(),
  }),
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

export const semesterRegistrationValidations = {
  zodCreateSemesterRegistrationValidationSchema,
  zodUpdateSemesterRegistrationValidationSchema,
  zodSemesterRegistrationIdValidationSchema,
};
