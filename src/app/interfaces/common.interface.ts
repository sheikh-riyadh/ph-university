import type { Types } from "mongoose";

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export interface IBaseUser {
  id: string;
  user: Types.ObjectId;
  name: TName;
  gender: Gender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  isDeleted: boolean;
}
