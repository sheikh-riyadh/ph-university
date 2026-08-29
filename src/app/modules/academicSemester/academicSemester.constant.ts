import type { IAcademicSemesterNameCodeMapper } from "./academicSemester.interface";

export const academicSemesterNameCodeMapper: IAcademicSemesterNameCodeMapper = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};

export const allowedAcademicSemesterSearchableFields = [
  "name",
  "year",
  "code",
  "startMonth",
  "endMonth",
  "id",
];

export const allowedAcademicSemesterFilterFields = [
  "name",
  "year",
  "code",
  "startMonth",
  "endMonth",
  "id",
];

export const excludedAcademicSemesterFields = [
  "search",
  "sort",
  "limit",
  "page",
  "skip",
  "fields",
  "password",
];
