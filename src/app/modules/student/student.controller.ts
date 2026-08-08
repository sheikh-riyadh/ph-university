import { StudentServices } from "./student.service";
import { Student } from "./student.model";
import { catchAsync } from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();

  res.status(200).json({
    success: true,
    message: "All students retrived successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getSingleStudentFromDB(
    req.params.id as string,
  );

  res.status(200).json({
    success: true,
    message: "Single student retrived successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await Student.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Updated student successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentServices.deleteStudentFromDB(id as string);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
