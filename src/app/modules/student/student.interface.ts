import type { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TStudentGender = "male" | "female";

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TBloodGroup = Array<
  "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
>;

export interface IStudent {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: TStudentGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
}

export interface IStudentCounter {
  key: string;
  sequence: number;
}

export interface StudentModelType extends Model<IStudent> {
  isStudentExist(id: string): Promise<boolean | null>;
}
