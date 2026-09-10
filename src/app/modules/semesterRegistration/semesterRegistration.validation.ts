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
  startTime: z.string({
    error: "invalid start time !",
  }),
  endTime: z.string({
    error: "invalid end time !",
  }),
});

const zodCreateSemesterRegistrationValidationSchema = z.object({
  body: semesterRegistrationValidation,
});

const zodSemesterRegistrationIdValidationSchema = z.object({
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

const zodUpdateSemesterRegistrationValidationSchema = z.object({
  body: semesterRegistrationValidation.partial(),
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

export const semesterRegistrationValidations = {
  zodCreateSemesterRegistrationValidationSchema,
  zodUpdateSemesterRegistrationValidationSchema,
  zodSemesterRegistrationIdValidationSchema,
};
