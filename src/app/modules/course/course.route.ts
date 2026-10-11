import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { courseValidations } from "./course.validation";
import { courseControllers } from "./course.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

router.post(
  "/create-course",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(courseValidations.zodCreateCourseValidationSchema),
  courseControllers.createCourse,
);

router.get(
  "/",
  auth(
    USER_ROLE.super_admin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  courseControllers.getAllCourses,
);

router.get(
  "/:id",
  auth(
    USER_ROLE.super_admin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  validateRequest(courseValidations.zodCourseIdValidationSchema),
  courseControllers.getSingleCourse,
);

router.patch(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(courseValidations.zodUpdateCourseValidationShema),
  courseControllers.updateCourse,
);

router.put(
  "/:courseId/assign-faculties",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(courseValidations.zodFacultiesWithCourseValidationSchema),
  courseControllers.assignFacultiesWithCourse,
);

router.delete(
  "/:courseId/remove-faculties",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(courseValidations.zodFacultiesWithCourseValidationSchema),
  courseControllers.removeFacultiesFromCourse,
);

router.delete(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(courseValidations.zodCourseIdValidationSchema),
  courseControllers.deleteCourse,
);

export const courseRoutes = router;
