import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { courseValidations } from "./course.validation";
import { courseControllers } from "./course.controller";
const router = express.Router();

router.post(
  "/create-course",
  validateRequest(courseValidations.zodCreateCourseValidationSchema),
  courseControllers.createCourse,
);

router.get("/", courseControllers.getAllCourses);

router.get(
  "/:id",
  validateRequest(courseValidations.zodCourseIdValidationSchema),
  courseControllers.getSingleCourse,
);

router.patch(
  "/:id",
  validateRequest(courseValidations.zodUpdateCourseValidationShema),
  courseControllers.updateCourse,
);

router.put(
  "/:courseId/assign-faculties",
  validateRequest(courseValidations.zodFacultiesWithCourseValidationSchema),
  courseControllers.assignFacultiesWithCourse,
);

router.delete(
  "/:courseId/remove-faculties",
  validateRequest(courseValidations.zodFacultiesWithCourseValidationSchema),
  courseControllers.removeFacultiesFromCourse,
);

router.delete(
  "/:id",
  validateRequest(courseValidations.zodCourseIdValidationSchema),
  courseControllers.deleteCourse,
);

export const courseRoutes = router;
