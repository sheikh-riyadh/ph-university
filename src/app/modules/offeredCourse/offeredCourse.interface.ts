import type { Types } from "mongoose";

export enum Days {
  SAT = "Sat",
  SUN = "Sun",
  MON = "Mon",
  TUE = "Tue",
  WED = "Wed",
  THU = "Thu",
  FRI = "Fri",
}

export interface IOfferedCourse {
  semesterRegistration: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: Array<Days>;
  startTime: string;
  endTime: string;
}

export interface ISchedule {
  days: Array<Days>;
  startTime: string;
  endTime: string;
}
