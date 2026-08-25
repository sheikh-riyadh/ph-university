import { catchAsync } from "../../utils/catchAsync";
import { userServices } from "./user.service";

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  const user = await userServices.createStudentIntoDB(password, student);
  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body;
  const facultyData = await userServices.createFacultyIntoDB(password, faculty);
  res.status(201).json({
    success: true,
    message: "Faculty created successfully",
    data: facultyData,
  });
});

export const userController = {
  createStudent,
  createFaculty,
};
