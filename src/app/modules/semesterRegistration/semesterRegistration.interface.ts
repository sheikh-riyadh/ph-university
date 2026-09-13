import type { Types } from "mongoose";

export enum SemesterRegistrationStatus {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  ENDED = "ENDED",
}

export interface ISemesterRegistration {
  academicSemester: Types.ObjectId;
  status: SemesterRegistrationStatus;
  startDate: Date;
  endDate: Date;
  minCredit?: number;
  maxCredit?: number;
}
