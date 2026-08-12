import type { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { Role } from "./user.interface";
import { User } from "./user.model";

const findLastStudentID = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    {
      role: Role.STUDENT,
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentID = async (
  academicSemester: IAcademicSemester,
): Promise<string> => {
  let currentId: number = 0;

  const lastStudentID = await findLastStudentID();

  const lastStudentSemesterCode = lastStudentID?.substring(4, 6);
  const lastStudentSemesterYear = lastStudentID?.substring(0, 4);

  const currentSemesterCode = academicSemester.code;
  const currentSemesterYear = academicSemester.year;

  if (
    lastStudentID &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemesterYear === currentSemesterYear
  ) {
    currentId = Number(lastStudentID.substring(6));
  }
  const studentId = (currentId + 1).toString().padStart(4, "0");
  return `${academicSemester.year}${academicSemester.code}${studentId}`;
};
