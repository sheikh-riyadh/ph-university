import { model, Schema } from "mongoose";
import type { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

academicDepartmentSchema.pre("save", async function () {
  const isExists = await AcademicFaculty.exists({ _id: this.academicFaculty });
  if (!isExists) {
    throw new Error("Academic faculty not found");
  }
});

export const AcademicDepartment = model<IAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema,
);
