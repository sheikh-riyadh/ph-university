import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { offeredCourseValidations } from "./offeredCourse.validation";
import { offeredCourseControllers } from "./offeredCourse.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-offered-course",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(
    offeredCourseValidations.zodCreateOfferedCourseValidationSchema,
  ),
  offeredCourseControllers.createOfferedCourse,
);

router.get(
  "/",
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.faculty),
  offeredCourseControllers.getAllOfferedCourses,
);

router.get(
  "/my-offered-courses",
  auth(USER_ROLE.student),
  offeredCourseControllers.getMyOfferedCourses,
);

router.get(
  "/:id",
  auth(
    USER_ROLE.super_admin,
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  validateRequest(offeredCourseValidations.zodOfferedCourseIdValidationSchema),
  offeredCourseControllers.getSingleOfferedCourse,
);

router.patch(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(
    offeredCourseValidations.zodUpdateOfferedCourseValidationSchema,
  ),
  offeredCourseControllers.updateOfferedCourse,
);

router.delete(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(offeredCourseValidations.zodOfferedCourseIdValidationSchema),
  offeredCourseControllers.deleteOfferedCourse,
);
export const offeredCourseRoutes = router;
