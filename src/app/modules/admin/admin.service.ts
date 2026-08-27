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

const getSingleAdminFromDB = async (adminId: string) => {
  const result = await Admin.findById(adminId);
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

const updateAdminIntoDB = async (adminId: string, payload: Partial<IAdmin>) => {
  const { name, ...remaining } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remaining,
  };

  if (name) {
    Object.entries(name).forEach(([key, value]) => {
      modifiedUpdateData[`name.${key}`] = value;
    });
  }

  const result = await Admin.findByIdAndUpdate(adminId, modifiedUpdateData);
  return result;
};

const deleteAdminFromDB = async (adminId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedUser = await User.findOneAndUpdate(
      { id: adminId },
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
      { id: adminId },
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
