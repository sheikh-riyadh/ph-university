import config from "../../config";
import { AppError } from "../../errors/appError";
import { STATUS } from "../user/user.constant";
import type { IJwtPayload } from "../user/user.interface";
import { User } from "../user/user.model";
import type {
  IChangePassword,
  ILoginUser,
  IResetPassword,
} from "./auth.interface";
import bcrypt from "bcrypt";
import { createToken, verifiedToken } from "./auth.utils";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail";

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

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in,
  );

  return {
    accessToken,
    refreshToken,
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

const refreshTokenFromServer = async (token: string) => {
  if (!token) {
    throw new AppError(401, "Unauthorized access !");
  }

  const payload = {
    token,
    secret: config.jwt_refresh_secret as string,
  };

  const decoded = verifiedToken(payload) as IJwtPayload;

  const { userId, role, iat } = decoded;

  const user = await User.findOne({
    id: userId,
    role,
  });

  if (!user || user.isDeleted) {
    throw new AppError(404, "user not found !");
  }

  if (user.status === STATUS.blocked) {
    throw new AppError(400, "user is blocked !");
  }

  // convert time milli-second
  const passwordUpdatedAt = Math.floor(
    new Date(user.passwordChangedAt as Date).getTime() / 1000,
  );

  if (passwordUpdatedAt && passwordUpdatedAt > (iat as number)) {
    throw new AppError(401, "Unauthorized access !");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in,
  );

  return {
    accessToken,
  };
};

const forgetPasswordIntoDB = async (id: string) => {
  const user = await User.findOne({
    id,
  });

  if (!user || user.isDeleted) {
    throw new AppError(404, "user not found !");
  }

  if (user.status === STATUS.blocked) {
    throw new AppError(403, "user is blocked !");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "5m",
  );
  const resetUIlink = `${config.front_end_url}?id=${user.id}&token=${resetToken}`;
  await sendEmail({ email: user.email, resetLink: resetUIlink });
};

const resetPasswordIntoDB = async (payload: IResetPassword) => {
  const user = await User.findOne({
    id: payload.id,
  });

  if (!user || user.isDeleted) {
    throw new AppError(404, "user not found !");
  }

  if (user.status === STATUS.blocked) {
    throw new AppError(403, "user is blocked !");
  }

  const decoded = jwt.verify(
    payload.token,
    config.jwt_access_secret as string,
  ) as IJwtPayload;

  if (decoded && decoded.userId !== user.id) {
    throw new AppError(401, "Unauthorized access !");
  }

  user.password = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  user.passwordChangedAt = new Date();
  user.needsPasswordChange = false;

  await User.findByIdAndUpdate(user._id, user);
};

export const authServices = {
  loginUserIntoDB,
  changePasswordFromDB,
  refreshTokenFromServer,
  forgetPasswordIntoDB,
  resetPasswordIntoDB,
};
