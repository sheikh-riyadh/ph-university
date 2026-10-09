import { GRADE } from "./enrolledCourse.constant";

const calculateGradeAndPoints = (totalMarks: number) => {
  const result = {
    grade: GRADE.NA,
    gradePoint: 0,
  };

  /**
   * 0 - 19   F
   * 20 - 39  D
   * 40 - 59  C
   * 60 - 79  B
   * 80 - 100 A
   */

  if (totalMarks >= 0 && totalMarks <= 19) {
    result.grade = GRADE.F
  }
};
