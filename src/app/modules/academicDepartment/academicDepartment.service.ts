import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import type { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: IAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find({});
  return result;
};

const getSingleAcademicDepartmentFromDB = async (
  academicDepartmentId: string,
) => {
  const result = await AcademicDepartment.findById(academicDepartmentId);
  return result;
};

const updateAcademicDepartmentFromDB = async (
  academicDepartmentId: string,
  payload: Partial<IAcademicDepartment>,
) => {
  const isExists = await AcademicFaculty.exists({ _id: academicDepartmentId });
  if (!isExists) {
    throw new Error("Academic faculty not found");
  }

  const result = await AcademicDepartment.findByIdAndUpdate(
    academicDepartmentId,
    payload,
    {
      returnDocument: "after",
    },
  );

  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
};
