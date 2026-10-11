import mongoose from "mongoose";
import config from "../../config";
import { AppError } from "../../errors/appError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import type { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import type { IJwtPayload, IUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentID } from "./user.utils";
import type { IFaculty } from "../faculty/faculty.interface";
import { generateFacultyID } from "../faculty/faculty.utils";
import { Faculty } from "../faculty/faculty.model";
import type { IAdmin } from "../admin/admin.interface";
import { generateAdminID } from "../admin/admin.utils";
import { Admin } from "../admin/admin.model";
import { USER_ROLE } from "./user.constant";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";

const createStudentIntoDB = async (
  file: Record<string, unknown>,
  password: string,
  payload: IStudent,
) => {
  const academicSemester = await AcademicSemester.isAcademicSemesterExists(
    payload.admissionSemester,
  );

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(404, "academic department not found !");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const studentId = await generateStudentID(academicSemester, session);

    const userData: Partial<IUser> = {
      password: password || (config.default_pass as string),
      role: USER_ROLE.student,
      id: studentId,
      email: payload.email,
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
      academicFaculty: academicDepartment.academicFaculty,
    };

    if (file?.path) {
      const imageName = `${studentId}_${payload.name.firstName}`;
      // send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(
        file?.path as string,
        imageName as string,
      );
      studentData.profileImage = secure_url;
    }

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

const createFacultyIntoDB = async (
  file: Record<string, unknown>,
  password: string,
  payload: IFaculty,
) => {
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(404, "academic department not found !");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const facultyId = await generateFacultyID(session);

    const userData: Partial<IUser> = {
      password: password || (config.default_pass as string),
      role: USER_ROLE.faculty,
      id: facultyId,
      email: payload.email,
    };

    // create a user transaction-1
    const newUser = (await User.create([userData], { session })).at(0);

    if (!newUser) {
      throw new AppError(400, "Failed to create user");
    }

    // send image to cloudinary

    const facultyData: IFaculty = {
      ...payload,
      id: newUser.id,
      user: newUser._id,
      academicFaculty: academicDepartment.academicFaculty,
    };

    if (file?.path) {
      const imageName = `${facultyId}_${payload.name.firstName}`;
      // send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(
        file?.path as string,
        imageName as string,
      );
      facultyData.profileImage = secure_url;
    }

    // Create a faculty transaction-2
    const newFaculty = await Faculty.create([facultyData], { session });

    if (!newFaculty.length) {
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

const createAdminIntoDB = async (
  file: Record<string, unknown>,
  password: string,
  payload: IAdmin,
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const adminId = await generateAdminID(session);
    const userData: Partial<IUser> = {
      password: password || (config.default_pass as string),
      role: USER_ROLE.admin,
      id: adminId,
      email: payload.email,
    };

    const newUser = (await User.create([userData], { session })).at(0);

    if (!newUser) {
      throw new AppError(400, "Failed to create user !");
    }

    const adminData: IAdmin = {
      ...payload,
      user: newUser._id,
      id: newUser.id,
    };

    if (file?.path) {
      const imageName = `${adminId}_${payload.name.firstName}`;
      // send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(
        file?.path as string,
        imageName as string,
      );
      adminData.profileImage = secure_url;
    }

    const newAdmin = await Admin.create([adminData], { session });

    if (!newAdmin.length) {
      throw new AppError(400, "Failed to create admin !");
    }

    await session.commitTransaction();
    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

const getMeFromDB = async ({ role, userId }: IJwtPayload) => {
  if (role === USER_ROLE.student) {
    return await Student.findOne({
      id: userId,
    });
  }
  if (role === USER_ROLE.faculty) {
    return await Faculty.findOne({
      id: userId,
    });
  }
  if (role === USER_ROLE.admin) {
    return await Admin.findOne({
      id: userId,
    });
  }

  return null;
};

const changeStatusFromDB = async (status: string, id: string) => {
  const result = await User.findByIdAndUpdate(id, { status }, { new: true });

  if (!result) {
    throw new AppError(404, "user not found !");
  }

  return result;
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMeFromDB,
  changeStatusFromDB,
};
