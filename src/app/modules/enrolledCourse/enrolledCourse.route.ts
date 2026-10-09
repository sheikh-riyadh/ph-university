import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { enrolledCourseValidations } from "./enrolledCourse.validation";
import { enrolledCourseControllers } from "./enrolledCourse.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-enrolled-course",
  auth(USER_ROLE.student),
  validateRequest(
    enrolledCourseValidations.zodCreateEnrolledCourseValidationSchema,
  ),
  enrolledCourseControllers.createEnrolledCourse,
);

router.patch(
  "/update-enrolled-course-marks/:id",
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(
    enrolledCourseValidations.zodEnrolledCourseMarksValidationSchema,
  ),
  enrolledCourseControllers.updateEnrolledCourseMarks,
);

export const enrolledRoutes = router;
