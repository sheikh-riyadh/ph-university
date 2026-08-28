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
  async function (id: Schema.Types.ObjectId) {
    const isExists = await this.exists({ _id: id });
    if (!isExists) {
      throw new AppError(404, "academic faculty not found !");
    }
    return isExists;
  },
);

academicFacultySchema.pre("findOneAndUpdate", async function () {
  const query = this.getQuery();
  const isAcademicFacultyExists = await this.model.exists(query);
  if (!isAcademicFacultyExists) {
    throw new AppError(404, "academic faculty not found !");
  }
});

export const AcademicFaculty = model<
  IAcademicFaculty,
  IAcademicFacultyModelType
>("AcademicFaculty", academicFacultySchema);
