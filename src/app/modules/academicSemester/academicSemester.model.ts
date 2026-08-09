import { model, Schema } from "mongoose";
import {
  Code,
  Month,
  Name,
  type IAcademicSemester,
} from "./academicSemester.interface";

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum: Object.values(Name),
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    code: {
      type: String,
      enum: Object.values(Code),
      required: true,
    },
    startMonth: {
      type: String,
      enum: Object.values(Month),
      required: true,
    },
    endMonth: {
      type: String,
      enum: Object.values(Month),
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const AcademicSemester = model<IAcademicSemester>(
  "AcademicSemter",
  academicSemesterSchema,
);
