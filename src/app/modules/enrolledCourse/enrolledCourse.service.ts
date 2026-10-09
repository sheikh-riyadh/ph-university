import mongoose, { type Types } from "mongoose";
import { AppError } from "../../errors/appError";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { Student } from "../student/student.model";
import type { IEnrolledCourse } from "./enrolledCourse.interface";
import { EnrolledCourse } from "./enrolledCourse.model";
import { Course } from "../course/course.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import type { IJwtPayload } from "../user/user.interface";

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
      {
        maxCredit: 1,
      },
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
      await EnrolledCourse.create([enrolledCoursePayload], {
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

const updateEnrolledCourseMarksIntoDB = async (
  faculty: IJwtPayload,
  payload: Pick<
    IEnrolledCourse,
    "semesterRegistration" | "offeredCourse" | "student" | "courseMarks"
  >,
  enrolledCourseId: string,
) => {
  const [semesterRegistration, offeredCourse, student] = await Promise.all([
    SemesterRegistration.findById(payload.semesterRegistration, {
      _id: 1,
    }),
    OfferedCourse.findById(payload.offeredCourse),
    { _id: 1 },
    Student.findById(payload.student, { _id: 1 }),
  ]);

  if (!semesterRegistration || !offeredCourse || !student) {
    const result = `${(!semesterRegistration && "semester registration") || (!offeredCourse && "offered course") || (!student && "student")}`;

    throw new AppError(404, `${result} not found !`);
  }

  const enrolledCourse = await EnrolledCourse.findById(enrolledCourseId, {
    _id: 1,
    faculty: 1,
  }).populate<{ faculty: { _id: Types.ObjectId; id: string } }>({
    path: "faculty",
    select: "id",
  });

  if (!enrolledCourse) {
    throw new AppError(404, "enrolled course not found !");
  }

  if (enrolledCourse.faculty.id !== faculty.userId) {
    throw new AppError(401, "faculty do not match in this enrolled course !");
  }

  const modifiedData: Record<string, unknown> = {
    ...payload.courseMarks,
  };

  if (payload.courseMarks && Object.keys(payload.courseMarks).length) {
    for (const [key, value] of Object.entries(payload.courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    enrolledCourse._id,
    modifiedData,
    {
      returnDocument: "after",
    },
  );

  return result;
};

export const enrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};
