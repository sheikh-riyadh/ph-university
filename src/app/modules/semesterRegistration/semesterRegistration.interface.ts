import type { Types } from "mongoose";
import type { SEMESTER_REGISTRATION_STATUS } from "./semesterRegistration.constant";

export type TSemesterRegistrationStatus =
  keyof typeof SEMESTER_REGISTRATION_STATUS;

export interface ISemesterRegistration {
  academicSemester: Types.ObjectId;
  status: TSemesterRegistrationStatus;
  startDate: Date;
  endDate: Date;
  minCredit?: number;
  maxCredit?: number;
}
