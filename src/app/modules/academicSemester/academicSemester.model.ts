import { model, Schema, type Types } from "mongoose";
import {
  Codes,
  Months,
  Name,
  type IAcademicSemester,
  type IAcademicSemesterModelType,
} from "./academicSemester.interface";
import { AppError } from "../../errors/appError";

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

academicSemesterSchema.static(
  "isAcademicSemesterExists",
  async function (id: Types.ObjectId) {
    const academicSemester = await this.findById(id);
    if (!academicSemester) {
      throw new AppError(404, "Academic semester not found !");
    }
    return academicSemester;
  },
);

academicSemesterSchema.pre("save", async function () {
  const isExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isExists) {
    throw new AppError(409, "Semester already exists");
  }
});

export const AcademicSemester = model<
  IAcademicSemester,
  IAcademicSemesterModelType
>("AcademicSemester", academicSemesterSchema);
