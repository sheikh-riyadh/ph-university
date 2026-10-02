import type { USER_ROLE } from "./user.constant";

// export enum Role {
//   ADMIN = "admin",
//   STUDENT = "student",
//   FACULTY = "faculty",
// }

export type TRole = keyof typeof USER_ROLE;

export enum Status {
  IN_PROGRESS = "in-progress",
  BLOCKED = "blocked",
}

export interface IUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: TRole;
  status: Status;
  isDeleted: boolean;
}
