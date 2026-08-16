import mongoose from "mongoose";
import config from "../../config";
import { AppError } from "../../error/appError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import type { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { Role, type IUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentID } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: IStudent) => {
  const academicSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!academicSemester) {
    throw new AppError(404, "Academic semester not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const studentId = await generateStudentID(academicSemester, session);

    const userData: Partial<IUser> = {
      password: password || (config.default_pass as string),
      role: Role.STUDENT,
      id: studentId,
    };

    // create a user transaction-1
    const newUser = await User.create([userData], { session });
    const user = newUser.at(0);

    if (!user) {
      throw new AppError(400, "Failed to create user");
    }

    payload.id = user.id;
    payload.user = user._id;

    // Create student transaction-2
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(400, "Falied to create student");
    }

    await session.commitTransaction();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const userServices = {
  createStudentIntoDB,
};
