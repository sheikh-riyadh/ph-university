import { AppError } from "../../errors/appError";
import type { ISemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (
  payload: ISemesterRegistration,
) => {
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async () => {
  const result = await SemesterRegistration.find();
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  if (!result) {
    throw new AppError(404, "semester registration not found !");
  }
  return result;
};

const updateSemesterRegistrationFromDB = async (
  id: string,
  payload: Partial<ISemesterRegistration>,
) => {
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload);
  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationFromDB,
};
