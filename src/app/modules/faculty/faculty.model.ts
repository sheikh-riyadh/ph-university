import { model, Schema } from "mongoose";
import type { IFaculty, IFacultyCounter } from "./faculty.interface";
import { basePersonSchema } from "../../schemas/common.schema";

const facultySchema = new Schema<IFaculty>(
  {
    ...basePersonSchema,
    designation: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const facultyCounterSchema = new Schema<IFacultyCounter>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    sequence: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const FacultyCounter = model<IFacultyCounter>(
  "FacultyCounter",
  facultyCounterSchema,
);

export const Faculty = model<IFaculty>("Faculty", facultySchema);
