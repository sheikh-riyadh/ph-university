import type { Types } from "mongoose";
import type { GRADE } from "./enrolledCourse.constant";

export type TGrade = keyof typeof GRADE;

export interface ICourseMarks {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  final: number;
}

export interface IEnrolledCourse {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  course: Types.ObjectId;
  student: Types.ObjectId;
  faculty: Types.ObjectId;
  isEnrolled: boolean;
  courseMarks: ICourseMarks;
  grade: TGrade;
  gradePoint: number;
  isCompleted: boolean;
}
