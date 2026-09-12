import { model, Schema } from "mongoose";
import {
  SemesterRegistrationStatus,
  type ISemesterRegistration,
} from "./semesterRegistration.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { AppError } from "../../errors/appError";

const semesterRegistrationSchema = new Schema<ISemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemester",
    unique: true,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(SemesterRegistrationStatus),
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

semesterRegistrationSchema.pre("save", async function () {
  const isAcademicSemesterExists = await AcademicSemester.exists({
    id: this.academicSemester,
  });

  if (!isAcademicSemesterExists) {
    throw new AppError(404, "academic semester not found !");
  }
});

semesterRegistrationSchema.pre("findOneAndUpdate", async function () {
  const query = this.getQuery();
  const updatedData = this.getUpdate() as Partial<ISemesterRegistration>;

  const isSemesterRegistrationExists = await this.model.findOne(query);
  if (!isSemesterRegistrationExists) {
    throw new AppError(404, "semester registration not found !");
  }

  const academicSemester = await AcademicSemester.findOne({
    _id: updatedData.academicSemester,
  });

  if (!academicSemester) {
    throw new AppError(404, "academic semester not found !");
  }
});

export const SemesterRegistration = model<ISemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema,
);
