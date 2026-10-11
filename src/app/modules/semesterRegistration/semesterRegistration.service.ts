import mongoose from "mongoose";
import { QueryBuilder } from "../../builders/QueryBuilder";
import { AppError } from "../../errors/appError";
import {
  allowedSemesterRegistrationFilterFields,
  allowedSemesterRegistrationSearchableFields,
  excludedSemesterRegistrationFields,
  SEMESTER_REGISTRATION_STATUS,
} from "./semesterRegistration.constant";
import { type ISemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";

const createSemesterRegistrationIntoDB = async (
  payload: ISemesterRegistration,
) => {
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query,
  )
    .search(allowedSemesterRegistrationSearchableFields)
    .filter(
      allowedSemesterRegistrationFilterFields,
      excludedSemesterRegistrationFields,
    )
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  const meta = await semesterRegistrationQuery.countTotal();
  return { ...result, meta };
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  if (!result) {
    throw new AppError(404, "semester registration not found !");
  }
  return result;
};

const updateSemesterRegistrationFromDB = async (
  id: string,
  payload: Partial<ISemesterRegistration>,
) => {
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const semesterRegistrationData =
      await SemesterRegistration.findById(id).session(session);

    if (!semesterRegistrationData) {
      throw new AppError(404, "semester registration not found !");
    }

    if (
      semesterRegistrationData.status !== SEMESTER_REGISTRATION_STATUS.UPCOMING
    ) {
      throw new AppError(
        400,
        `you can not delete because it's ${semesterRegistrationData.status}`,
      );
    }

    await OfferedCourse.deleteMany(
      {
        semesterRegistration: semesterRegistrationData._id,
      },
      { session },
    );

    const result = await SemesterRegistration.findByIdAndDelete(id, {
      session,
    });

    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationFromDB,
  deleteSemesterRegistrationFromDB,
};
