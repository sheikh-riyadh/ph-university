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

const getAllCoursesFrom = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .search(allowedCouseSearchableFields)
    .filter(allowedCourseFilterFields, excludedCourseFields)
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
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
  getAllCoursesFrom,
  getSingleCourseFromDB,
  deleteCourseFromDB,
};
