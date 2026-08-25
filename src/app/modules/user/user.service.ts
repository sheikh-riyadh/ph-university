import mongoose from "mongoose";
import config from "../../config";
import { AppError } from "../../errors/appError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import type { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { Role, type IUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentID } from "./user.utils";
import type { IFaculty } from "../faculty/faculty.interface";
import { generateFacultyID } from "../faculty/faculty.utils";
import { Faculty } from "../faculty/faculty.model";

const createStudentIntoDB = async (password: string, payload: IStudent) => {
  const academicSemester = await AcademicSemester.isAcademicSemesterExists(
    payload.admissionSemester,
  );

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
    const newUser = (await User.create([userData], { session })).at(0);

    if (!newUser) {
      throw new AppError(400, "Failed to create user");
    }

    const studentData: IStudent = {
      ...payload,
      id: newUser.id,
      user: newUser._id,
    };

    // Create student transaction-2
    const newStudent = await Student.create([studentData], { session });

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

const createFacultyIntoDB = async (password: string, payload: IFaculty) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const facultyId = await generateFacultyID(session);

    const userData: Partial<IUser> = {
      password: password || (config.default_pass as string),
      role: Role.FACULTY,
      id: facultyId,
    };

    // create a user transaction-1
    const newUser = (await User.create([userData], { session })).at(0);

    if (!newUser) {
      throw new AppError(400, "Failed to create user");
    }

    const facultyData: IFaculty = {
      ...payload,
      id: newUser.id,
      user: newUser._id,
    };

    // Create a faculty transaction-2
    const newFaculty = await Faculty.create([facultyData], { session });

    if (!newFaculty?.length) {
      throw new AppError(400, "Failed to create faculty");
    }

    await session.commitTransaction();
    return newFaculty;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
