import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../errors/appError";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";

export const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, "Unauthorized access !");
    }

    jwt.verify(token, config.jwt_access_token as string, (error, decode) => {
      if (error) {
        throw new AppError(401, "Unauthorized access !");
      }
      req.user = decode as JwtPayload;
      next();
    });
  });
};
