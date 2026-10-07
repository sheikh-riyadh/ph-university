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

export const enrolledCourseControllers = {
  createEnrolledCourse,
};
