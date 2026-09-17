import z from "zod";
import { zodMongooseObjectIdValidationSchema } from "../../validations/common.validation";
import { Days } from "./offeredCourse.interface";

const offeredCourseValidationSchema = z.object({
  semesterRegistration: zodMongooseObjectIdValidationSchema,
  academicFaculty: zodMongooseObjectIdValidationSchema,
  academicDepartment: zodMongooseObjectIdValidationSchema,
  course: zodMongooseObjectIdValidationSchema,
  faculty: zodMongooseObjectIdValidationSchema,
  maxCapacity: z.number({
    error: "max-capacity is required !",
  }),
  section: z.number({
    error: "section is required !",
  }),
  days: z.array(
    z.enum(Days, {
      error: "please provide valid day !",
    }),
  ),
  startTime: z.string({
    error: "start time is required !",
  }),
  endTime: z.string({
    error: "end time is required !",
  }),
});

const zodCreateOfferedCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: offeredCourseValidationSchema,
  }),
});

const zodOfferedCourseIdValidationSchema = z.object({
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

const zodUpdateOfferedCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: offeredCourseValidationSchema.partial(),
  }),
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

export const offeredCourseValidations = {
  zodCreateOfferedCourseValidationSchema,
  zodUpdateOfferedCourseValidationSchema,
  zodOfferedCourseIdValidationSchema,
};
