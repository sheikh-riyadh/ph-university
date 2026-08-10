export enum Month {
  JANUARY = "January",
  FEBRUARY = "February",
  MARCH = "March",
  APRIL = "April",
  MAY = "May",
  JUNE = "June",
  JULY = "July",
  AUGUST = "August",
  SEPTEMBER = "September",
  OCTOBER = "October",
  NOVEMBER = "November",
  DECEMBER = "December",
}

export enum Name {
  AUTUMN = "Autumn",
  SUMMER = "Summer",
  FALL = "Fall",
}

export enum Code {
  "01" = "01",
  "02" = "02",
  "03" = "03",
}

export interface IAcademicSemester {
  name: Name;
  year: string;
  code: Code;
  startMonth: Month;
  endMonth: Month;
}

export interface IAcademicSemesterNameCodeMapper {
  [key: string]: string;
}
