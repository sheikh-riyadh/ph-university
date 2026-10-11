import express from "express";
import { StudentControllers } from "./student.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { studentValidations } from "./student.validation";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  StudentControllers.getAllStudents,
);

router.get(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(studentValidations.zodStudentIdValidationSchema),
  StudentControllers.getSingleStudent,
);

router.patch(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(studentValidations.zodUpdateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(studentValidations.zodStudentIdValidationSchema),
  StudentControllers.deleteStudent,
);

export const studentRoutes = router;
