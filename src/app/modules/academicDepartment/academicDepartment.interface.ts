import type { Types, Model } from "mongoose";

export interface IAcademicDepartment {
  name: string;
  academicFaculty: Types.ObjectId;
}

export interface IAcademicDepartmentModelType extends Model<IAcademicDepartment> {
  isAcademicDepartmentExists(id: string): Promise<boolean | null>;
}
