import { QueryBuilder } from "../../builders/QueryBuilder";
import { AppError } from "../../errors/appError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
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
    academicSemester,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  const [
    semesterRegistrationExists,
    academicSemesterExists,
    academicFacultyExists,
    academicDepartmentExists,
    courseExists,
    facultyExists,
  ] = await Promise.all([
    SemesterRegistration.exists({ _id: semesterRegistration }),
    AcademicSemester.exists({ _id: academicSemester }),
    AcademicFaculty.exists({ _id: academicFaculty }),
    AcademicDepartment.exists({ _id: academicDepartment }),
    Course.exists({ _id: course }),
    Faculty.exists({ _id: faculty }),
  ]);

  if (!semesterRegistrationExists) {
    throw new AppError(404, "semester registration not found !");
  }

  if (!academicSemesterExists) {
    throw new AppError(404, "academic semester not found !");
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

  const result = await OfferedCourse.create(payload);

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
