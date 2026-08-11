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

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemestersFromDB();
  res.status(200).json({
    success: true,
    message: "All academic semester retrived successfully",
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const semesterId = req.params.semesterId as string;
  const result =
    await academicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
  res.status(200).json({
    success: true,
    message: "Retrived single academic semester successfully",
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await academicSemesterServices.updateAcademicSemesterFromDB(
    semesterId as string,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Academic semester updated successfully",
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
