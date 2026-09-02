import mongoose from "mongoose";
import { QueryBuilder } from "../../builders/QueryBuilder";
import {
  allowedCourseFilterFields,
  allowedCouseSearchableFields,
  excludedCourseFields,
} from "./course.constant";
import type { IAssignFacultiesWithCourse, ICourse } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import { updatePreRequisiteCourse } from "./course.utils";
import { AppError } from "../../errors/appError";

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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Transaction-1
    const basicUpdatedInfo = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        returnDocument: "after",
        session,
      },
    );

    if (!basicUpdatedInfo) {
      throw new AppError(400, "failed to update basic info !");
    }

    const result = await updatePreRequisiteCourse(
      id,
      preRequisiteCourses ?? [],
      session,
    );

    await session.commitTransaction();
    return result;
  } catch {
    await session.abortTransaction();
    throw new AppError(400, "failed to update course !");
  } finally {
    await session.endSession();
  }
};

const assignFacultiesWithCourseIntoDB = async (
  courseId: string,
  payload: Partial<IAssignFacultiesWithCourse>,
) => {
  const result = await CourseFaculty.findOneAndUpdate(
    { course: courseId },
    {
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      returnDocument: "after",
    },
  );

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
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseFromDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
};
