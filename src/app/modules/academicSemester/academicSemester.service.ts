import { AppError } from "../../error/appError";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import type { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(400, "Invalid semester code");
  }
  const result = await AcademicSemester.create(payload);
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
  payload: Partial<IAcademicSemester>,
) => {
  const existingSemester = await AcademicSemester.findById(id);

  if (!existingSemester) {
    throw new AppError(404, "Academic semester not found");
  }

  const name = payload.name ?? existingSemester.name;
  const code = payload.code ?? existingSemester.code;

  if (academicSemesterNameCodeMapper[name] !== code) {
    throw new AppError(400, "Invalid semester code");
  }

  const result = await AcademicSemester.findByIdAndUpdate(id, payload, {
    returnDocument: "after",
  });
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
};
