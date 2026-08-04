export enum Role {
  admin = "admin",
  student = "student",
  faculty = "faculty",
}

export enum Status {
  in_progress = "in-progress",
  block = "blocked",
}

export interface IUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: Role;
  status: Status;
  isDeleted: boolean;
}
