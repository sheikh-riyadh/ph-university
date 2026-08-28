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

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body;
  const result = await userServices.createAdminIntoDB(password, admin);
  res.status(201).json({
    success: true,
    message: "Created admin successfully",
    data: result,
  });
});

export const userControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
