import type { Types } from "mongoose";
import type { IBaseUser } from "../../interfaces/common.interface";

export interface IAdmin extends IBaseUser {
  designation: string;
  manageDepartment: Types.ObjectId;
}

export interface IAdminCounter {
  key: string;
  sequence: number;
}
