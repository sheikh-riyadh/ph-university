import z from "zod";

const zodAcademicFacultyValidationSchema = z.object({
  name: z.string(),
});

export const academicFacultyValidations = {
  zodAcademicFacultyValidationSchema,
};
