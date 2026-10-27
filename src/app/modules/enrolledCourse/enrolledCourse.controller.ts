import { catchAsync } from "../../utils/catchAsync";
import { enrolledCourseServices } from "./enrolledCourse.service";

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await enrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );
  res.status(201).json({
    success: true,
    message: "course enrolled successfully !",
    data: result,
  });
});
const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const studentId = req.user.userId;
  const result = await enrolledCourseServices.getMyEnrolledCoursesFromDB(
    studentId as string,
  );
  res.status(200).json({
    success: true,
    message: "my offered courses retrived successfully !",
    data: result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const result = await enrolledCourseServices.updateEnrolledCourseMarksIntoDB(
    req.user,
    req.body,
    req.params.id as string,
  );
  res.status(200).json({
    success: true,
    message: "enrolled course marks updated successfully !",
    data: result,
  });
});
export const enrolledCourseControllers = {
  createEnrolledCourse,
  getMyEnrolledCourses,
  updateEnrolledCourseMarks,
};
