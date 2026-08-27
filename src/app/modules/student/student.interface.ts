import type { Model, Types } from "mongoose";
import type {
  BloodGroup,
  Gender,
  IBaseUser,
} from "../../interfaces/common.interface";

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

export interface IStudent extends IBaseUser {
  password: string;
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
  isUserExists(id: string): Promise<boolean | null>;
}
