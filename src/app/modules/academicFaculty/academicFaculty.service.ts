import { QueryBuilder } from "../../builders/QueryBuilder";
import {
  allowedAcademicFacultyFilterFields,
  allowedAcademicFacultySearchableFields,
  excludedAcademicFacultyFields,
} from "./academicFaculty.constant";
import type { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAcademicFacultiesFromDB = async (query: Record<string, unknown>) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .search(allowedAcademicFacultySearchableFields)
    .filter(allowedAcademicFacultyFilterFields, excludedAcademicFacultyFields)
    .sort()
    .paginate()
    .fields();

  const result = await academicFacultyQuery.modelQuery;
  const meta = await academicFacultyQuery.countTotal();
  return { result, meta };
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateSingleAcademicFacultyFromDB = async (
  id: string,
  payload: Partial<IAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateSingleAcademicFacultyFromDB,
};
