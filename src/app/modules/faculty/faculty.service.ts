import type { IFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";

const getAllFacultiesFromDB = async () => {
  const result = await Faculty.find();
  return result;
};

const getSingleFacultyFromDB = async (facultyId: string) => {
  const result = await Faculty.findById(facultyId);
  return result;
};

const updateFacultyFromDB = async (
  facultyId: string,
  payload: Partial<IFaculty>,
) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name) {
    Object.entries(name).forEach(([key, value]) => {
      modifiedUpdateData[`name.${key}`] = value;
    });
  }

  const result = await Faculty.findByIdAndUpdate(
    facultyId,
    modifiedUpdateData,
    {
      returnDocument: "after",
    },
  );
  return result;
};

export const facultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyFromDB,
};
