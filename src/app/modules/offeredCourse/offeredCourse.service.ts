import { QueryBuilder } from "../../builders/QueryBuilder";
import { AppError } from "../../errors/appError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { allowedSearchableFields } from "../student/student.constant";
import {
  allowedOfferCourseFilterFields,
  excludedOfferedCourseFields,
} from "./offeredCourse.constant";
import type { IOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";

const createOfferedCourseIntoDB = async (payload: IOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  const [
    semesterRegistrationExists,
    academicFacultyExists,
    academicDepartmentExists,
    courseExists,
    facultyExists,
  ] = await Promise.all([
    SemesterRegistration.findById(semesterRegistration),
    AcademicFaculty.findById(academicFaculty),
    AcademicDepartment.findById(academicDepartment),
    Course.findById(course),
    Faculty.findById(faculty),
  ]);

  if (!semesterRegistrationExists) {
    throw new AppError(404, "semester registration not found !");
  }

  if (!academicFacultyExists) {
    throw new AppError(404, "academic faculty not found !");
  }

  if (!academicDepartmentExists) {
    throw new AppError(404, "academic department not found !");
  }

  if (!courseExists) {
    throw new AppError(404, "course not found !");
  }

  if (!facultyExists) {
    throw new AppError(404, "faculty not found !");
  }

  if (!academicDepartmentExists.academicFaculty.equals(academicFaculty)) {
    throw new AppError(
      409,
      `This ${academicDepartmentExists.name} does not belong to ${academicFacultyExists.name}`,
    );
  }

  const existingSchedule = await OfferedCourse.find({
    faculty,
    course,
    days: { $in: days },
  }).select("startTime endTime days");

  // 10:20 start
  // 12:20 end => new time

  // 10:20 start
  // 12:20 end => existing time

  existingSchedule.forEach((schedule) => {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}:00`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}:00`);
    const newStartTime = new Date(`1970-01-01T${startTime}:00`);
    const newEndTime = new Date(`1970-01-01T${endTime}:00`);
    //        10:20           12:20             12:20           10:20
    if (newStartTime <= existingEndTime && newEndTime >= existingStartTime) {
      throw new AppError(
        409,
        `this faculty not available on that time choose another date or time !`,
      );
    }
  });

  const academicSemester = semesterRegistrationExists.academicSemester;

  const result = await OfferedCourse.create({ ...payload, academicSemester });

  return result;
};

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const offerCourseQuery = new QueryBuilder(
    OfferedCourse.find()
      .populate("semesterRegistration")
      .populate("academicSemester")
      .populate("academicFaculty")
      .populate("academicDepartment")
      .populate("course")
      .populate("faculty"),
    query,
  )
    .search(allowedSearchableFields)
    .filter(allowedOfferCourseFilterFields, excludedOfferedCourseFields)
    .sort()
    .paginate()
    .fields();

  const result = await offerCourseQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
};
