import { model, Schema } from "mongoose";
import {
  SemesterRegistrationStatus,
  type ISemesterRegistration,
} from "./semesterRegistration.interface";

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

export const SemesterRegistration = model<ISemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema,
);
