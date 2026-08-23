import { model, Schema } from "mongoose";
import type { IFaculty } from "./faculty.interface";
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

export const Faculty = model<IFaculty>("Faculty", facultySchema);
