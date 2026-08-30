import mongoose from "mongoose";
import type { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import { User } from "../user/user.model";
import { AppError } from "../../errors/appError";
import { QueryBuilder } from "../../builders/QueryBuilder";
import {
  allowedAdminFilterFields,
  allowedAdminSearchableFields,
  excludedAdminFields,
} from "./admin.constant";

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(allowedAdminSearchableFields)
    .filter(allowedAdminFilterFields, excludedAdminFields)
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<IAdmin>) => {
  const { name, ...remaining } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remaining,
  };

  if (name) {
    Object.entries(name).forEach(([key, value]) => {
      modifiedUpdateData[`name.${key}`] = value;
    });
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdateData);
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedUser = await User.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        returnDocument: "after",
        session,
      },
    );

    if (!deletedUser) {
      throw new AppError(400, "Failed to delete user");
    }

    const deletedAdmin = await Admin.findOneAndUpdate(
      { user: deletedUser._id },
      {
        isDeleted: true,
      },
      {
        returnDocument: "after",
        session,
      },
    );

    if (!deletedAdmin) {
      throw new AppError(400, "Failed to delete admin");
    }

    await session.commitTransaction();
    return deletedAdmin;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const adminServices = {
  getSingleAdminFromDB,
  getAllAdminsFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
