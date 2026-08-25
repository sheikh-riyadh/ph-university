import type { Model, Types } from "mongoose";

export interface IAcademicFaculty {
  name: string;
}

export interface IAcademicFacultyModelType extends Model<IAcademicFaculty> {
  isAcademicFacultExists(id: Types.ObjectId): Promise<boolean | null>;
}
