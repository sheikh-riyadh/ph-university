import type { Model } from "mongoose";

export interface IAcademicFaculty {
  name: string;
}

export interface IAcademicFacultyModelType extends Model<IAcademicFaculty> {
  isAcademicFacultExists(id: string): Promise<boolean | null>;
}
