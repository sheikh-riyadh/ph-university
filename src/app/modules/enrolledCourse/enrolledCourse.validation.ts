import z from "zod";
import { zodMongooseObjectIdValidationSchema } from "../../validations/common.validation";

const zodCreateEnrolledCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: zodMongooseObjectIdValidationSchema,
  }),
});

const zodEnrolledCourseMarksValidationSchema = z.object({
  body: z.object({
    semesterRegistration: zodMongooseObjectIdValidationSchema,
    offeredCourse: zodMongooseObjectIdValidationSchema,
    student: zodMongooseObjectIdValidationSchema,
    courseMarks: z.object({
      classTest1: z.number().min(0).max(10).optional(),
      midTerm: z.number().min(0).max(30).optional(),
      classTest2: z.number().min(0).max(10).optional(),
      final: z.number().min(0).max(50).optional(),
    }),
  }),
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

export const enrolledCourseValidations = {
  zodCreateEnrolledCourseValidationSchema,
  zodEnrolledCourseMarksValidationSchema,
};
