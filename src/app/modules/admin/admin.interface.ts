import type { IBaseUser } from "../../interfaces/common.interface";

export interface IAdmin extends IBaseUser {
  designation: string;
}

export interface IAdminCounter {
  key: string;
  sequence: number;
}
