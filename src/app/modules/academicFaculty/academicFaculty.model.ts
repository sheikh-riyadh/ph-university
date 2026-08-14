import { model, Schema } from "mongoose";
import type { IAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const AcademicFaculty = model<IAcademicFaculty>(
  "AcademicFaculty",
  academicFacultySchema,
);
