import type { IStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (payload: IStudent) => {
  const isExist = await Student.isStudentExist(payload.id);
  if (!isExist) {
    const result = await Student.create(payload);
    return result;
  } else {
    throw new Error("User already exists");
  }
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find({});
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id);
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

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
};
