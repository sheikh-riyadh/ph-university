import type { IAcademicSemester } from "../academicSemester/academicSemester.interface";

export const generateStudentID = (
  academicSemester: IAcademicSemester,
): string => {
  const currentId = (0).toString();
  let studentId = (Number(currentId) + 1).toString().padStart(4, "0");
  studentId = `${academicSemester.year}${academicSemester.code}${studentId}`;
  return studentId;
};
