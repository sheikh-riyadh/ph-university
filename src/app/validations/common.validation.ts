import z from "zod";

export const zodNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
});

export const zodGenderValidationSchema = z.enum(["male", "female"]);

export const personValidationSchema = {
  name: zodNameValidationSchema,
  gender: zodGenderValidationSchema,
  dateOfBirth: z.string().optional(),
  email: z.email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  profileImage: z.string(),
};
