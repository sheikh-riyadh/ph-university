import { catchAsync } from "../../utils/catchAsync";
import { academicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = academicFacultyServices.createAcademicFacultyIntoDB(req.body);
  res.status(201).json({
    success: true,
    message: "Created academic faculty successfully",
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAcademicFacultiesFromDB();
  res.status(200).json({
    success: true,
    message: "Academic faculties retrived successfully",
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(
    facultyId as string,
  );

  res.status(200).json({
    success: true,
    message: "Single acadmic faculty retrived successfully",
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await academicFacultyServices.updateSingleAcademicFacultyFromDB(
      facultyId as string,
      req.body,
    );

  res.status(200).json({
    success: true,
    message: "Academic faculty updated successfully",
    data: result,
  });
});

export const academicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
