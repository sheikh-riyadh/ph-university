import { AppError } from "../../errors/appError";
import { Status } from "../user/user.interface";
import { User } from "../user/user.model";
import type { ILoginUser } from "./auth.interface";
import bcrypt from "bcrypt";

const loginUserIntoDB = async (payload: ILoginUser) => {
  const user = await User.findOne({
    id: payload.id,
  });

  if (!user || user.isDeleted) {
    throw new AppError(404, "user not found !");
  }

  if (user.status === Status.BLOCKED) {
    throw new AppError(403, "user is blocked !");
  }

  const isValidPassoword = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isValidPassoword) {
    throw new AppError(400, "invalid password !");
  }

  return user;
};

export const authServices = {
  loginUserIntoDB,
};
