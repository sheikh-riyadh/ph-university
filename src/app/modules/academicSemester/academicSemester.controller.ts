import { catchAsync } from "../../utils/catchAsync";
import { academicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  res.status(201).json({
    success: true,
    message: "Semester created successfully",
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
};
