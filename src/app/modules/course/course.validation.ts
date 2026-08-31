import mongoose from "mongoose";
import z from "zod";

const preRequisiteCoursesValidationShema = z.object({
  course: z.string().optional(),
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
    id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "invalid course id !",
    }),
  }),
});

const zodUpdateCourseValidationShema = z.object({
  body: z.object({
    course: courseValidationSchema.partial(),
  }),
  params: z.object({
    id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "invalid course id !",
    }),
  }),
});

export const courseValidations = {
  zodCreateCourseValidationSchema,
  zodCourseIdValidationSchema,
  zodUpdateCourseValidationShema,
};
