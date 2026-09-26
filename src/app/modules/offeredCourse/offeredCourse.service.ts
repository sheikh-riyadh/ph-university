import { QueryBuilder } from "../../builders/QueryBuilder";
import { AppError } from "../../errors/appError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistrationStatus } from "../semesterRegistration/semesterRegistration.interface";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { allowedSearchableFields } from "../student/student.constant";
import {
  allowedOfferCourseFilterFields,
  excludedOfferedCourseFields,
} from "./offeredCourse.constant";
import type { IOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { hasTimeConflict } from "./offeredCourse.utils";

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

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    course,
    days: { $in: days },
  }).select("startTime endTime days");

  if (hasTimeConflict(assignedSchedules, { days, startTime, endTime })) {
    throw new AppError(
      409,
      `this faculty not available on that time choose another date or time !`,
    );
  }

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

const updateOfferedCourseFromDB = async (
  id: string,
  payload: Pick<
    IOfferedCourse,
    "faculty" | "course" | "days" | "startTime" | "endTime"
  >,
) => {
  const { faculty, course, days, startTime, endTime } = payload;

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(404, "faculty not found !");
  }

  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(404, "offered course not found !");
  }

  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists.semesterRegistration,
  );

  if (semesterRegistration?.status !== SemesterRegistrationStatus.UPCOMING) {
    throw new AppError(
      400,
      `you can not update because it's ${semesterRegistration?.status}`,
    );
  }

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration: isOfferedCourseExists.semesterRegistration,
    faculty,
    course,
    days: { $in: days },
  }).select("startTime endTime days");

  if (hasTimeConflict(assignedSchedules, { days, startTime, endTime })) {
    throw new AppError(
      409,
      `this faculty not available on that time choose another date or time !`,
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload);
  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseFromDB,
};
