import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";
import config from "../config";
import type { IJwtPayload, TRole } from "../modules/user/user.interface";

export const auth = (...requiredRole: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, "Unauthorized access !");
    }

    jwt.verify(token, config.jwt_access_token as string, (error, decoded) => {
      if (error) {
        throw new AppError(401, "Unauthorized access !!");
      }
      req.user = decoded as IJwtPayload;

      if (requiredRole && !requiredRole.includes(req.user.role)) {
        throw new AppError(401, "Unauthorized access !!!");
      }

      next();
    });
  });
};
