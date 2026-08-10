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
      type: String,
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

academicSemesterSchema.pre("save", async function () {
  const isExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isExists) {
    throw new Error("Semester already exists");
  }
});

export const AcademicSemester = model<IAcademicSemester>(
  "AcademicSemter",
  academicSemesterSchema,
);
