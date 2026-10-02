import config from "../../config";
import { AppError } from "../../errors/appError";
import { STATUS } from "../user/user.constant";
import type { IJwtPayload } from "../user/user.interface";
import { User } from "../user/user.model";
import type { IChangePassword, ILoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUserIntoDB = async (payload: ILoginUser) => {
  const user = await User.findOne({
    id: payload.id,
  }).select("+password");

  if (!user || user.isDeleted) {
    throw new AppError(404, "user not found !");
  }

  if (user.status === STATUS.blocked) {
    throw new AppError(403, "user is blocked !");
  }

  const isValidPassoword = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isValidPassoword) {
    throw new AppError(400, "invalid password !");
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    config.jwt_access_token as string,
    { expiresIn: "7d" },
  );

  return {
    accessToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const changePasswordFromDB = async (
  userData: IJwtPayload,
  payload: IChangePassword,
) => {
  const user = await User.findOne({
    id: userData.userId,
    role: userData.role,
  }).select("+password");

  if (!user) {
    throw new AppError(404, "user not found !");
  }

  const isValidPassword = await bcrypt.compare(
    payload.oldPassword,
    user.password,
  );

  if (!isValidPassword) {
    throw new AppError(400, "invalid old password !");
  }

  user.password = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  user.needsPasswordChange = false;

  user.passwordChangedAt = new Date();

  const result = await User.findByIdAndUpdate(user._id, user, {
    returnDocument: "after",
  });
  return result;
};

export const authServices = {
  loginUserIntoDB,
  changePasswordFromDB,
};
