import { catchAsync } from "../../utils/catchAsync";
import { userServices } from "./user.service";

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  const user = await userServices.createStudentIntoDB(
    {
      path: req.file?.path,
    },
    password,
    student,
  );

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body;
  const facultyData = await userServices.createFacultyIntoDB(
    { path: req.file?.path },
    password,
    faculty,
  );
  res.status(201).json({
    success: true,
    message: "Faculty created successfully",
    data: facultyData,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body;
  const result = await userServices.createAdminIntoDB(
    { path: req.file?.path },
    password,
    admin,
  );
  res.status(201).json({
    success: true,
    message: "Created admin successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const result = await userServices.getMeFromDB(req.user);
  res.status(200).json({
    success: true,
    message: "data retrived successfully !",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const result = await userServices.changeStatusFromDB(
    req.body.status,
    req.params.id as string,
  );
  res.status(200).json({
    success: true,
    message: "status changed successfully !",
    data: result,
  });
});

export const userControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
