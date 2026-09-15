import { catchAsync } from "../../utils/catchAsync";

const createOfferedCourse = catchAsync(async (req, res) => {
  res.status(201).json({
    success: true,
    message: "offered course created successfully !",
    data: "",
  });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "all offered courses retrived successfully !",
    data: "",
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "single offered course retrived successfully !",
    data: "",
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "update offered course successfully !",
    data: "",
  });
});

export const offeredCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
  updateOfferedCourse,
};
