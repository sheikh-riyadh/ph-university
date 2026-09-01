import type { ClientSession } from "mongoose";
import type { ICourse, IPreRequisiteCourses } from "./course.interface";
import { Course } from "./course.model";
import { AppError } from "../../errors/appError";

export const updatePreRequisiteCourse = async (
  id: string,
  preRequisiteCourses: Array<IPreRequisiteCourses>,
  session: ClientSession,
): Promise<ICourse | null> => {
  // Here we remove from the course which preRequisite course is deleted
  if (preRequisiteCourses && preRequisiteCourses.length) {
    const deletedPreRequisite = preRequisiteCourses
      .filter(
        (preRequisiteCourse) =>
          preRequisiteCourse.course && preRequisiteCourse.isDeleted,
      )
      .map((preRequisiteCourse) => preRequisiteCourse.course);

    //   Transaction-2
    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
      id,
      {
        $pull: {
          preRequisiteCourses: { course: { $in: deletedPreRequisite } },
        },
      },
      {
        new: true,
        returnDocument: "after",
        session,
      },
    );

    if (!deletedPreRequisiteCourses) {
      throw new AppError(400, "failed to deleted pre-requisite course");
    }

    const addedPreRequisite = preRequisiteCourses.filter(
      (preRequisiteCourse) =>
        preRequisiteCourse.course && !preRequisiteCourse.isDeleted,
    );

    // Transaction-3
    const addedPreRequisiteCourses = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet: { preRequisiteCourses: { $each: addedPreRequisite } },
      },
      {
        new: true,
        returnDocument: "after",
        session,
      },
    );

    if (!addedPreRequisiteCourses) {
      throw new AppError(400, "failed to add pre-requisite course");
    }
  }

  const result = await Course.findById(id)
    .session(session)
    .populate("preRequisiteCourses.course");

  return result;
};
