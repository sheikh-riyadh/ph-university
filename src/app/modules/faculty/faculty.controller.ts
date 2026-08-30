import { catchAsync } from "../../utils/catchAsync";
import { facultyServices } from "./faculty.service";

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.getSingleFacultyFromDB(id as string);

  res.status(200).json({
    success: true,
    message: "Single faculty retrived successfully",
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFacultiesFromDB(req.query);
  res.status(200).json({
    success: true,
    message: "All faculties retrived succssfully",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.updateFacultyFromDB(
    id as string,
    req?.body?.faculty,
  );

  res.status(200).json({
    success: true,
    message: "Faculty updated successfully",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.deleteFacultyFromDB(id as string);

  res.status(200).json({
    success: true,
    message: "Faculty deleted successfully",
    data: result,
  });
});

export const facultyControllers = {
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
};
