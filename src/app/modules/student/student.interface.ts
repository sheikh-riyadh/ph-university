import type { Model, Types } from "mongoose";
import type { Gender, IBaseUser } from "../../interfaces/common.interface";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

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

export interface IStudent extends IBaseUser {
  password: string;
  bloodGroup?: BloodGroup;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
}

export interface IStudentQuery {
  search: string;
  email: string;
  gender: Gender;
  bloodGroup: BloodGroup;
  sort: string;
  limit: number;
  page: number;
  fields: string;
}

export interface IStudentCounter {
  key: string;
  sequence: number;
}

export interface StudentModelType extends Model<IStudent> {
  isStudentExist(id: string): Promise<boolean | null>;
}
