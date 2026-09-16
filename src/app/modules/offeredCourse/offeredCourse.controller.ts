import { catchAsync } from "../../utils/catchAsync";
import { offeredCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.createOfferedCourseIntoDB(
    req.body.offeredCourse,
  );
  res.status(201).json({
    success: true,
    message: "offered course created successfully !",
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.getAllOfferedCourseFromDB(
    req.query,
  );
  res.status(200).json({
    success: true,
    message: "all offered courses retrived successfully !",
    data: result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseServices.getSingleOfferedCourseFromDB(
    id as string,
  );
  res.status(200).json({
    success: true,
    message: "single offered course retrived successfully !",
    data: result,
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
