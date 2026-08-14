import { catchAsync } from "../../utils/catchAsync";
import { academicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  res.status(201).json({
    success: true,
    message: "Academic department created successfully",
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.getAllAcademicDepartmentsFromDB();
  res.status(200).json({
    success: true,
    message: "All academic department retrived successfully",
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { academicDepartmentId } = req.params;
  const result =
    await academicDepartmentServices.getSingleAcademicDepartmentFromDB(
      academicDepartmentId as string,
    );

  res.status(200).json({
    success: true,
    message: "Single academic department retrived successfully",
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { academicDepartmentId } = req.params;
  const result =
    await academicDepartmentServices.updateAcademicDepartmentFromDB(
      academicDepartmentId as string,
      req.body,
    );
  res.status(200).json({
    success: true,
    message: "Academic department updated successfully",
    data: result,
  });
});

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
