import { AppError } from "../../errors/appError";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { Student } from "../student/student.model";
import type { IEnrolledCourse } from "./enrolledCourse.interface";
import { EnrolledCourse } from "./enrolledCourse.model";

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: IEnrolledCourse,
) => {
  const offeredCourse = await OfferedCourse.findById(payload.offeredCourse);

  if (!offeredCourse) {
    throw new AppError(404, "offered course not found !");
  }

  if (offeredCourse.maxCapacity <= 0) {
    throw new AppError(400, "room is full please try another section !");
  }

  const student = await Student.findOne({
    id: userId,
  });

  if (!student) {
    throw new AppError(404, "student not found !");
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: offeredCourse.semesterRegistration,
    offeredCourse: offeredCourse._id,
    student: student?._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(
      400,
      "student already enrolled this course at this moment",
    );
  }
};

export const enrolledCourseServices = {
  createEnrolledCourseIntoDB,
};
