export enum Months {
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

export enum Codes {
  "01" = "01",
  "02" = "02",
  "03" = "03",
}

export interface IAcademicSemester {
  name: Name;
  year: string;
  code: Codes;
  startMonth: Months;
  endMonth: Months;
}

export interface IAcademicSemesterNameCodeMapper {
  [key: string]: string;
}
