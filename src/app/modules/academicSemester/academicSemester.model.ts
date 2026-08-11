import { model, Schema } from "mongoose";
import {
  Codes,
  Months,
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
      enum: Object.values(Codes),
      required: true,
    },
    startMonth: {
      type: String,
      enum: Object.values(Months),
      required: true,
    },
    endMonth: {
      type: String,
      enum: Object.values(Months),
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
