import { GRADE } from "./enrolledCourse.constant";
import type { TGrade } from "./enrolledCourse.interface";

export const calculateGradeAndPoints = (totalMarks: number) => {
  const result: { grade: TGrade; gradePoint: number } = {
    grade: GRADE.NA,
    gradePoint: 0,
  };

  if (totalMarks >= 0 && totalMarks <= 19) {
    result.grade = GRADE.F;
    result.gradePoint = 0;
  } else if (totalMarks >= 20 && totalMarks <= 39) {
    result.grade = GRADE.D;
    result.gradePoint = 1;
  } else if (totalMarks >= 40 && totalMarks <= 59) {
    result.grade = GRADE.C;
    result.gradePoint = 2;
  } else if (totalMarks >= 60 && totalMarks <= 79) {
    result.grade = GRADE.B;
    result.gradePoint = 3;
  } else if (totalMarks >= 80 && totalMarks <= 100) {
    result.grade = GRADE.A;
    result.gradePoint = 4;
  }

  return result;
};
