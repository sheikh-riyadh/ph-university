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

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find({});
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemesterFromDB = async (
  id: string,
  academicData: Partial<IAcademicSemester>,
) => {
  const existingSemester = await AcademicSemester.findById(id);

  if (!existingSemester) {
    throw new Error("Academic semester not found");
  }

  const name = academicData.name ?? existingSemester.name;
  const code = academicData.code ?? existingSemester.code;

  if (academicSemesterNameCodeMapper[name] !== code) {
    throw new Error("Invalid semester code");
  }

  const result = await AcademicSemester.findByIdAndUpdate(id, academicData, {
    new: true,
  });
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
};
