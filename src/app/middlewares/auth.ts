import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../errors/appError";
import config from "../config";
import type { IJwtPayload, TRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { STATUS } from "../modules/user/user.constant";
import { verifiedToken } from "../modules/auth/auth.utils";

export const auth = (...requiredRole: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, "Unauthorized access !");
    }

    const payload = {
      token,
      secret: config.jwt_access_secret as string,
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

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(401, "Unauthorized access !!!");
    }
    req.user = decoded;
    next();
  });
};
