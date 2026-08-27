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

export enum BloodGroup {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-",
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
  bloodGroup?: BloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  isDeleted: boolean;
}
