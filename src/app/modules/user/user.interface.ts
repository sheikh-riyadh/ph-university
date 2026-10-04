import type { STATUS, USER_ROLE } from "./user.constant";

export type TRole = keyof typeof USER_ROLE;
export type TStatus = keyof typeof STATUS;

export interface IUser {
  id: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  needsPasswordChange: boolean;
  role: TRole;
  status: TStatus;
  isDeleted: boolean;
}

export interface IJwtPayload {
  userId: string;
  role: TRole;
  iat?: number;
}
