import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import type { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (
  academicData: IAcademicSemester,
) => {
  if (academicSemesterNameCodeMapper[academicData.name] !== academicData.code) {
    throw new Error("Invalid semester code");
  }
  const result = await AcademicSemester.create(academicData);
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
};
