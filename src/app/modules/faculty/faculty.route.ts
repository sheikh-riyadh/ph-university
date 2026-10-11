import express from "express";
import { facultyControllers } from "./faculty.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { facultyValidations } from "./faculty.validation";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.faculty),
  facultyControllers.getAllFaculties,
);

router.get(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(facultyValidations.zodFacultyIdValidationSchema),
  facultyControllers.getSingleFaculty,
);

router.patch(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(facultyValidations.zodUpdateFacultyValidationSchema),
  facultyControllers.updateFaculty,
);

router.delete(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(facultyValidations.zodFacultyIdValidationSchema),
  facultyControllers.deleteFaculty,
);

export const facultyRoutes = router;
