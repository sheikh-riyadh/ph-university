import mongoose from "mongoose";
import { AppError } from "../../error/appError";
import type { IStudent } from "./student.interface";
import { Student } from "./student.model";
import { User } from "../user/user.model";

const createStudentIntoDB = async (payload: IStudent) => {
  const isExist = await Student.isStudentExist(payload.id);
  if (!isExist) {
    const result = await Student.create(payload);
    return result;
  } else {
    throw new AppError(409, "User already exists");
  }
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
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
  const result = await Student.findByIdAndUpdate(studentId, payload, {
    returnDocument: "after",
  });
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
    console.log("ID BEFORE QUERY:", id);
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { returnDocument: "after", session },
    );

    console.log("DELETED STUDENT:", deletedStudent);

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
