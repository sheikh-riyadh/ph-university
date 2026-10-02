import z from "zod";
import { zodMongooseObjectIdValidationSchema } from "../../validations/common.validation";
import { Days } from "./offeredCourse.interface";

const offeredCourseValidationSchema = {
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
  startTime: z
    .string({
      error: "start time is required !",
    })
    .refine(
      (startTime) => {
        const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
        return timeRegex.test(startTime);
      },
      {
        message: "invalid start-time",
      },
    ),
  endTime: z
    .string({
      error: "end time is required !",
    })
    .refine(
      (endTime) => {
        const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
        return timeRegex.test(endTime);
      },
      {
        message: "invalid end-time",
      },
    ),
};

const zodCreateOfferedCourseValidationSchema = z.object({
  body: z.object({ ...offeredCourseValidationSchema }).refine(
    (body) => {
      const startTime = new Date(`1970-01-01T${body.startTime}:00`);
      const endTime = new Date(`1970-01-01T${body.endTime}`);
      return endTime > startTime;
    },
    {
      message: "start-time should be before end-time",
    },
  ),
});

const zodOfferedCourseIdValidationSchema = z.object({
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

const zodUpdateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: zodMongooseObjectIdValidationSchema,
      maxCapacity: z.number({
        error: "max-capacity is required !",
      }),
      days: z.array(
        z.enum(Days, {
          error: "please provide valid day !",
        }),
      ),
      startTime: z
        .string({
          error: "start time is required !",
        })
        .refine(
          (startTime) => {
            const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
            return timeRegex.test(startTime);
          },
          {
            message: "invalid start-time",
          },
        ),
      endTime: z
        .string({
          error: "end time is required !",
        })
        .refine(
          (endTime) => {
            const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
            return timeRegex.test(endTime);
          },
          {
            message: "invalid end-time",
          },
        ),
    })
    .refine(
      (body) => {
        const startTime = new Date(`1970-01-01T${body.startTime}:00`);
        const endTime = new Date(`1970-01-01T${body.endTime}`);
        return endTime > startTime;
      },
      {
        message: "start-time should be before end-time",
      },
    ),
});

export const offeredCourseValidations = {
  zodCreateOfferedCourseValidationSchema,
  zodUpdateOfferedCourseValidationSchema,
  zodOfferedCourseIdValidationSchema,
};
