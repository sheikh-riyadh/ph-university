import { model, Schema } from "mongoose";
import type { IFaculty, IFacultyCounter } from "./faculty.interface";
import { basePersonSchema } from "../../schemas/common.schema";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AppError } from "../../errors/appError";

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

facultySchema.pre("save", async function () {
  const isAcademicFacultyExists = await AcademicFaculty.isAcademicFacultExists(
    this.academicFaculty,
  );

  const isAcademicDepartmentExists =
    await AcademicDepartment.isAcademicDepartmentExists(
      this.academicDepartment,
    );

  if (!isAcademicFacultyExists) {
    throw new AppError(404, "academic faculty not found !");
  }

  if (!isAcademicDepartmentExists) {
    throw new AppError(404, "academic department not found !");
  }
});

facultySchema.pre("findOneAndUpdate", async function () {
  const query = this.getQuery();
  const payload = this.getUpdate() as Partial<IFaculty>;

  const faculty = await Faculty.findOne({ ...query, isDeleted: { $ne: true } });

  if (!faculty) {
    throw new AppError(404, "faculty not found !");
  }

  const academicFacultyId = payload.academicFaculty || faculty.academicFaculty;

  const academicDepartmentId =
    payload.academicDepartment || faculty.academicDepartment;

  await AcademicFaculty.isAcademicFacultExists(academicFacultyId);

  await AcademicDepartment.isAcademicDepartmentExists(academicDepartmentId);
});

// Query Middleware
facultySchema.pre("find", function () {
  this.find({ isDeleted: { $ne: true } });
});

facultySchema.pre("findOne", function () {
  this.find({ isDeleted: { $ne: true } });
});

facultySchema.pre("aggregate", function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

export const Faculty = model<IFaculty>("Faculty", facultySchema);

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
    versionKey: false,
  },
);

export const FacultyCounter = model<IFacultyCounter>(
  "FacultyCounter",
  facultyCounterSchema,
);
