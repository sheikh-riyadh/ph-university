import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import type { IJwtPayload } from "../user/user.interface";
import type { IVerifiedToken } from "./auth.interface";

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: string,
  expiresIn: StringValue,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifiedToken = (payload: IVerifiedToken) => {
  return jwt.verify(payload.token, payload.secret);
};
