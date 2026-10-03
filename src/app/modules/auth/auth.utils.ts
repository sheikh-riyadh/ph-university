import type { IJwtPayload } from "../user/user.interface";
import jwt, { type SignOptions } from "jsonwebtoken";

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: string,
  expiresIn: NonNullable<SignOptions["expiresIn"]>,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
