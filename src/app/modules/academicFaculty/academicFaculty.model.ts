import { model, Schema } from "mongoose";
import type {
  IAcademicFaculty,
  IAcademicFacultyModelType,
} from "./academicFaculty.interface";
import { AppError } from "../../errors/appError";

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

academicFacultySchema.static(
  "isAcademicFacultExists",
  async function (id: string) {
    const isExists = await this.exists({ _id: id });
    if (!isExists) {
      throw new AppError(404, "Academic faculty not found !");
    }
    return isExists;
  },
);

export const AcademicFaculty = model<
  IAcademicFaculty,
  IAcademicFacultyModelType
>("AcademicFaculty", academicFacultySchema);
