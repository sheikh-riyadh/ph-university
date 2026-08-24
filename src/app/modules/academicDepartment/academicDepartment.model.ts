import { model, Schema } from "mongoose";
import type {
  IAcademicDepartment,
  IAcademicDepartmentModelType,
} from "./academicDepartment.interface";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AppError } from "../../errors/appError";

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

academicDepartmentSchema.static(
  "isAcademicDepartmentExists",
  async function (id: string) {
    const isExists = await this.exists({ _id: id });
    if (!isExists) {
      throw new AppError(404, "Academic department not found");
    }
    return isExists
  },
);

academicDepartmentSchema.pre("save", async function () {
  const isExists = await AcademicFaculty.exists({ _id: this.academicFaculty });
  if (!isExists) {
    throw new AppError(404, "Academic faculty not found!");
  }
});

academicDepartmentSchema.pre("findOneAndUpdate", async function () {
  const query = this.getQuery();
  const payload = this.getUpdate() as Partial<IAcademicDepartment>;

  const department = await this.model.findOne(query);

  if (!department) {
    throw new AppError(404, "Academic department not found !");
  }

  const academicFaculty = payload.academicFaculty ?? department.academicFaculty;

  const isFacultyExists = await AcademicFaculty.exists({
    _id: academicFaculty,
  });

  if (!isFacultyExists) {
    throw new AppError(404, "Academic faculty not found !");
  }
});

export const AcademicDepartment = model<
  IAcademicDepartment,
  IAcademicDepartmentModelType
>("AcademicDepartment", academicDepartmentSchema);
