import { QueryBuilder } from "../../builders/QueryBuilder";
import {
  allowedCourseFilterFields,
  allowedCouseSearchableFields,
  excludedCourseFields,
} from "./course.constant";
import type { ICourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDB = async (payload: ICourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query,
  )
    .search(allowedCouseSearchableFields)
    .filter(allowedCourseFilterFields, excludedCourseFields)
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course",
  );
  return result;
};

const updateCourseFromDB = async (id: string, payload: Partial<ICourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;

  const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    remainingCourseData,
    {
      returnDocument: "after",
    },
  );

  return updatedBasicCourseInfo;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      returnDocument: "after",
    },
  );

  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseFromDB,
  deleteCourseFromDB,
};
