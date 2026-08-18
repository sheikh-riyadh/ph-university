import type { ClientSession } from "mongoose";
import type { IAcademicSemester } from "./academicSemester.interface";
import { StudentCounter } from "../student/student.model";

export const createCounter = async (
  academicSemesterData: IAcademicSemester,
  session: ClientSession,
) => {
  const counterKey = `${academicSemesterData.year}${academicSemesterData.code}`;

  const result = await StudentCounter.create(
    [
      {
        key: counterKey,
        sequence: 0,
      },
    ],
    { session },
  );

  return result.at(0);
};
