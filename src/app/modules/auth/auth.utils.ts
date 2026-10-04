import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import type { IJwtPayload } from "../user/user.interface";

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: string,
  expiresIn: StringValue,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
