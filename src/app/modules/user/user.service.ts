import config from "../../config";
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
    throw new Error("Academic semester not found");
  }

  const userData: Partial<IUser> = {
    password: password || (config.default_pass as string),
    role: Role.STUDENT,
    id: await generateStudentID(academicSemester),
  };
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
