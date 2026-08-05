import config from "../../config";
import type { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { Role, type IUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: IStudent) => {
  const userData: Partial<IUser> = {
    password: password || (config.default_pass as string),
    role: Role.STUDENT,
    id: "2030100001",
  };
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
