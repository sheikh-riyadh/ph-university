import z from "zod";
import { zodMongooseObjectIdValidationSchema } from "../../validations/common.validation";
// import { GRADE } from "./enrolledCourse.constant";

// const courseMarksValidationSchema = z.object({
//   classTest1: z.number().optional(),
//   midTerm: z.number().optional(),
//   classTest2: z.number().optional(),
//   final: z.number().optional(),
// });

// const zodEnrolledCourseValidationSchema = z.object({
//   body: z.object({
//     semesterRegistration: zodMongooseObjectIdValidationSchema,
//     academicSemester: zodMongooseObjectIdValidationSchema,
//     academicFaculty: zodMongooseObjectIdValidationSchema,
//     academicDepartment: zodMongooseObjectIdValidationSchema,
//     offeredCourse: zodMongooseObjectIdValidationSchema,
//     course: zodMongooseObjectIdValidationSchema,
//     student: zodMongooseObjectIdValidationSchema,
//     faculty: zodMongooseObjectIdValidationSchema,
//     isEnrolled: z.boolean().optional(),
//     courseMarks: courseMarksValidationSchema,
//     grade: z.enum(Object.values(GRADE) as [string, ...string[]], {
//       error: "invalid grade please provide valid grade",
//     }),
//     gradePoint: z.number().min(0).max(4).optional(),
//     isCompleted: z.boolean().optional(),
//   }),
// });

const zodCreateEnrolledCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: zodMongooseObjectIdValidationSchema,
  }),
});

export const enrolledCourseValidations = {
  zodCreateEnrolledCourseValidationSchema,
};
