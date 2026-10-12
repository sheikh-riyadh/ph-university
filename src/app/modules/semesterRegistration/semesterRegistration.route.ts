import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { semesterRegistrationValidations } from "./semesterRegistration.validation";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-semester-registration",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(
    semesterRegistrationValidations.zodCreateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get(
  "/",
  auth(
    USER_ROLE.super_admin,
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  semesterRegistrationControllers.getAllSemesterRegistration,
);

router.get(
  "/:id",
  auth(
    USER_ROLE.super_admin,
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  validateRequest(
    semesterRegistrationValidations.zodSemesterRegistrationIdValidationSchema,
  ),
  semesterRegistrationControllers.getSingleSemesterRegistration,
);

router.patch(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(
    semesterRegistrationValidations.zodUpdateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

router.delete(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(
    semesterRegistrationValidations.zodSemesterRegistrationIdValidationSchema,
  ),
  semesterRegistrationControllers.deleteSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
