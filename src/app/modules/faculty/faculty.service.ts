import mongoose from "mongoose";
import type { IFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import { User } from "../user/user.model";
import { AppError } from "../../errors/appError";
import { QueryBuilder } from "../../builders/QueryBuilder";
import {
  allowedFacultyFilterFields,
  allowedFacultySearchableFields,
  excludedFacultyFields,
} from "./faculty.constant";

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate("academicFaculty").populate("academicDepartment"),
    query,
  )
    .search(allowedFacultySearchableFields)
    .filter(allowedFacultyFilterFields, excludedFacultyFields)
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;

  return result;
};

const getSingleFacultyFromDB = async (facultyId: string) => {
  const result = await Faculty.findById(facultyId)
    .populate("academicFaculty")
    .populate("academicDepartment");
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

const deleteFacultyFromDB = async (facultyId: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedUser = await User.findOneAndUpdate(
      { id: facultyId },
      { isDeleted: true },
      { returnDocument: "after", session },
    );

    if (!deletedUser) {
      throw new AppError(400, "Failed to delete user");
    }

    const deletedFaculty = await Faculty.findOneAndUpdate(
      { id: facultyId },
      { isDeleted: true },
      { returnDocument: "after", session },
    );

    if (!deletedFaculty) {
      throw new AppError(400, "Failed to delete faculty");
    }

    await session.commitTransaction();
    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const facultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyFromDB,
  deleteFacultyFromDB,
};
