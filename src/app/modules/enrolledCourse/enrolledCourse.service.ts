import mongoose, { type Types } from "mongoose";
import { AppError } from "../../errors/appError";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { Student } from "../student/student.model";
import type { IEnrolledCourse } from "./enrolledCourse.interface";
import { EnrolledCourse } from "./enrolledCourse.model";
import { Course } from "../course/course.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: IEnrolledCourse,
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const offeredCourse = await OfferedCourse.findById(
      payload.offeredCourse,
    ).session(session);

    if (!offeredCourse) {
      throw new AppError(404, "offered course not found !");
    }

    if (offeredCourse.maxCapacity <= 0) {
      throw new AppError(400, "room is full please try another section !");
    }

    const student = await Student.findOne(
      {
        id: userId,
      },
      {
        _id: 1,
      },
    ).session(session);

    if (!student) {
      throw new AppError(404, "student not found !");
    }

    const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
      semesterRegistration: offeredCourse.semesterRegistration,
      offeredCourse: offeredCourse._id,
      student: student?._id,
    }).session(session);

    if (isStudentAlreadyEnrolled) {
      throw new AppError(
        400,
        "student already enrolled this course at this moment",
      );
    }

    const enrolledCourses = await EnrolledCourse.aggregate([
      {
        $match: {
          semesterRegistration: offeredCourse.semesterRegistration,
          student: student._id,
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "enrolledCoursesData",
        },
      },
      {
        $unwind: "$enrolledCoursesData",
      },
      {
        $group: {
          _id: null,
          totalCredits: { $sum: "$enrolledCoursesData.credits" },
        },
      },
    ]).session(session);

    const course = await Course.findById(offeredCourse.course).session(session);
    const semesterRegistration = await SemesterRegistration.findById(
      offeredCourse.semesterRegistration,
    );

    const totalCredits = enrolledCourses[0]?.totalCredits || 0;

    if (
      totalCredits &&
      course?.credits &&
      semesterRegistration?.maxCredit &&
      totalCredits + course?.credits > semesterRegistration?.maxCredit
    ) {
      throw new AppError(400, "you have exceeded maxium number of credits");
    }

    const enrolledCoursePayload: IEnrolledCourse = {
      semesterRegistration: offeredCourse.semesterRegistration,
      academicSemester: offeredCourse.academicSemester as Types.ObjectId,
      academicFaculty: offeredCourse.academicFaculty,
      academicDepartment: offeredCourse.academicDepartment,
      offeredCourse: offeredCourse._id,
      course: offeredCourse.course,
      student: student?._id,
      faculty: offeredCourse.faculty,
      isEnrolled: true,
    };

    const result = (
      await EnrolledCourse.create([{ ...enrolledCoursePayload }], {
        session,
      })
    ).at(0);

    if (!result) {
      throw new AppError(400, "failed to enrolled course!");
    }

    offeredCourse.maxCapacity -= 1;
    await offeredCourse.save({ session });

    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const enrolledCourseServices = {
  createEnrolledCourseIntoDB,
};
