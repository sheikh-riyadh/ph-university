import z from "zod";
import { zodMongooseObjectIdValidationSchema } from "../../validations/common.validation";

const preRequisiteCoursesValidationShema = z.object({
  course: zodMongooseObjectIdValidationSchema.optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const courseValidationSchema = z.object({
  title: z.string({
    error: "title is required !",
  }),
  prefix: z.string({ error: "prefix is required !" }),
  code: z.number({ error: "code is required !" }),
  credits: z.number({ error: "credits is required !" }),
  isDeleted: z.boolean().default(false).optional(),
  preRequisiteCourses: z.array(preRequisiteCoursesValidationShema).optional(),
});

const zodCreateCourseValidationSchema = z.object({
  body: z.object({
    course: courseValidationSchema,
  }),
});

const zodCourseIdValidationSchema = z.object({
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

const zodUpdateCourseValidationShema = z.object({
  body: z.object({
    course: courseValidationSchema.partial(),
  }),
  params: z.object({
    id: zodMongooseObjectIdValidationSchema,
  }),
});

const zodFacultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z
      .array(zodMongooseObjectIdValidationSchema)
      .min(1, "At least one faculty is required"),
  }),
  params: z.object({
    courseId: zodMongooseObjectIdValidationSchema,
  }),
});

export const courseValidations = {
  zodCreateCourseValidationSchema,
  zodCourseIdValidationSchema,
  zodUpdateCourseValidationShema,
  zodFacultiesWithCourseValidationSchema,
};
