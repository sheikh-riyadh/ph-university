import mongoose from "mongoose";
import { AppError } from "../../error/appError";
import type { IStudent } from "./student.interface";
import { Student } from "./student.model";
import { User } from "../user/user.model";
import {
  allowedFilterFields,
  allowedSearchableFields,
  excludedFields,
} from "./student.constant";

const createStudentIntoDB = async (payload: IStudent) => {
  const isExist = await Student.isStudentExist(payload.id);
  if (!isExist) {
    const result = await Student.create(payload);
    return result;
  } else {
    throw new AppError(409, "User already exists");
  }
};

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const { search } = query;

  const filter: Record<string, unknown> = {
    isDeleted: false,
  };

  if (typeof search === "string" && search.trim() && search.length <= 100) {
    filter.$or = allowedSearchableFields.map((field) => ({
      [field]: {
        $regex: search.trim(),
        $options: "i",
      },
    }));
  }

  const partialSearch = Student.find(filter);

  const newQuery: Record<string, unknown> = {};

  allowedFilterFields.forEach((field) => {
    if (query[field] !== undefined) {
      newQuery[field] = query[field];
    }
  });

  excludedFields.forEach((element) => delete newQuery[element]);

  const partialAndExactSearchResult = partialSearch
    .find(newQuery)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  let sort = "-createdAt";

  if (query?.sort) {
    sort = query.sort as string;
  }

  const sortedResult = partialAndExactSearchResult.sort(sort);

  let limit = 10,
    page = 1,
    skip = 0;

  if (query?.limit) {
    limit = Number(query.limit);
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginedResult = sortedResult.skip(skip);

  const limitedResult = paginedResult.limit(limit);

  let fields = "";

  if (query.fields) {
    fields = (query.fields as string).split(",").join(" ");
  }

  const fieldsResult = await limitedResult.select(fields);

  return fieldsResult;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updateStudentFromDB = async (
  studentId: string,
  payload: Partial<IStudent>,
) => {
  const { name, localGuardian, guardian, ...remainingStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name) {
    Object.entries(name).forEach(([key, value]) => {
      modifiedUpdateData[`name.${key}`] = value;
    });
  }

  if (localGuardian) {
    Object.entries(localGuardian).forEach(([key, value]) => {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    });
  }

  if (guardian) {
    Object.entries(guardian).forEach(([key, value]) => {
      modifiedUpdateData[`guardian.${key}`] = value;
    });
  }

  const result = await Student.findByIdAndUpdate(
    studentId,
    modifiedUpdateData,
    {
      returnDocument: "after",
    },
  );
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedUser = await User.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );

    if (!deletedUser) {
      throw new AppError(400, "User not found or already deleted");
    }
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { returnDocument: "after", session },
    );

    if (!deletedStudent) {
      throw new AppError(400, "Student not found or already deleted");
    }

    await session.commitTransaction();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
};
