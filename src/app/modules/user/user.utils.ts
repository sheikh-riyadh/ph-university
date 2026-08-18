import type { ClientSession } from "mongoose";
import type { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { StudentCounter } from "../student/student.model";

/* 


{
  "name": "Summer",
  "year": "2026",
  "code": "02",
  "startMonth": "January",
  "endMonth": "April",
}



*/

export const generateStudentID = async (
  academicSemester: IAcademicSemester,
  session: ClientSession,
): Promise<string> => {
  const counterKey = `${academicSemester.year}${academicSemester.code}`;

  const counter = await StudentCounter.findOneAndUpdate(
    {
      key: counterKey,
    },
    {
      $inc: {
        sequence: 1,
      },
    },
    {
      new: true,
      session,
    },
  );

  if (!counter) {
    throw new Error("Failed to generate student ID");
  }

  const sequence = counter.sequence.toString().padStart(4, "0");

  return `${counterKey}${sequence}`;
};
