import type { Types } from "mongoose";
import type { IBaseUser } from "../../interfaces/common.interface";

export interface IFaculty extends IBaseUser {
  designation: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
}
