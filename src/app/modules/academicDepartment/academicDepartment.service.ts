import { QueryBuilder } from "../../builders/QueryBuilder";
import {
  allowedAcademicDepartmentFilterFields,
  allowedAcademicDepartmentSearchableFields,
  excludedAcademicDepartmentFields,
} from "./academicDepartment.constant";
import type { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: IAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async (
  query: Record<string, unknown>,
) => {
  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartment.find().populate("academicFaculty"),
    query,
  )
    .search(allowedAcademicDepartmentSearchableFields)
    .filter(
      allowedAcademicDepartmentFilterFields,
      excludedAcademicDepartmentFields,
    )
    .sort()
    .paginate()
    .fields();

  const result = await academicDepartmentQuery.modelQuery;

  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate("academicFaculty");
  return result;
};

const updateAcademicDepartmentFromDB = async (
  id: string,
  payload: Partial<IAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    returnDocument: "after",
  }).populate("academicFaculty");

  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
};
