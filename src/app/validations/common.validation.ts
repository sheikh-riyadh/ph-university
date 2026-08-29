import z from "zod";
import { BloodGroup, Gender } from "../interfaces/common.interface";

export const zodNameValidationSchema = z.object({
  firstName: z.string({
    error: "firstName is required",
  }),
  middleName: z.string({
    error: "middleName is required",
  }),
  lastName: z.string({
    error: "lastName is required",
  }),
});

export const zodGenderValidationSchema = z.enum(Gender, {
  error: "Invalid gender. Please provide a valid gender.",
});

export const zodBloodGroupSchema = z.enum(BloodGroup, {
  error: "Invalid blood group. Please provide a valid blood group.",
});

export const personValidationSchema = {
  name: zodNameValidationSchema,
  gender: zodGenderValidationSchema,
  dateOfBirth: z
    .string({
      error: "Invalid date of birth",
    })
    .optional(),
  email: z.email({
    error: "email is required.",
  }),
  contactNo: z.string({
    error: "contact number is required.",
  }),
  emergencyContactNo: z.string({
    error: "emergency contact number is required.",
  }),
  presentAddress: z.string({
    error: "present address is required.",
  }),
  permanentAddress: z.string({
    error: "permanent address is required.",
  }),
  profileImage: z.string({
    error: "profile image is required.",
  }),
  bloodGroup: zodBloodGroupSchema.optional(),
};
