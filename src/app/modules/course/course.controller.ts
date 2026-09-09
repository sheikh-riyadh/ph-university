import { catchAsync } from "../../utils/catchAsync";
import { courseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const { course } = req.body;
  const result = await courseServices.createCourseIntoDB(course);
  res.status(201).json({
    success: true,
    message: "Created course successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCourseFromDB(id as string);
  res.status(200).json({
    success: true,
    message: "Single course retrived successfully",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCoursesFromDB(req.query);
  res.status(200).json({
    success: true,
    message: "All courses retrived successfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.updateCourseFromDB(
    id as string,
    req.body.course,
  );

  res.status(200).json({
    success: true,
    message: "Course updated successfully !",
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.assignFacultiesWithCourseIntoDB(
    courseId as string,
    req.body.faculties,
  );
  res.status(200).json({
    success: true,
    message: "Assign faculties with course successfully",
    data: result,
  });
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.removeFacultiesFromCourseFromDB(
    courseId as string,
    req.body.faculties,
  );

  res.status(200).json({
    success: true,
    message: "faculties removed successfully !",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.deleteCourseFromDB(id as string);
  res.status(200).json({
    success: true,
    message: "Deleted course successfully",
    data: result,
  });
});

export const courseControllers = {
  createCourse,
  getSingleCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
};
