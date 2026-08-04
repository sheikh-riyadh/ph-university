export enum Role {
  ADMIN = "admin",
  STUDENT = "student",
  FACULTY = "faculty",
}

export enum Status {
  IN_PROGRESS = "in-progress",
  BLOCKED = "blocked",
}

export interface IUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: Role;
  status: Status;
  isDeleted: boolean;
}
