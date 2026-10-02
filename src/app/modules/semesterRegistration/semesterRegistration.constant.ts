export const allowedSemesterRegistrationSearchableFields = ["status"];

export const allowedSemesterRegistrationFilterFields = ["status"];

export const excludedSemesterRegistrationFields = [
  "search",
  "sort",
  "limit",
  "page",
  "skip",
  "fields",
  "password",
];

export const SEMESTER_REGISTRATION_STATUS = {
  UPCOMING: "UPCOMING",
  ONGOING: "ONGOING",
  ENDED: "ENDED",
} as const;
