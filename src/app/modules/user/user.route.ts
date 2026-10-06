import express from "express";
import { userControllers } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { facultyValidations } from "../faculty/faculty.validation";
import { adminValidations } from "../admin/admin.validation";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { userValidations } from "./user.validation";

const route = express.Router();

route.post(
  "/create-student",
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.zodCreateStudentValidationSchema),
  userControllers.createStudent,
);

route.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  validateRequest(facultyValidations.zodCreateFacultyValidationSchema),
  userControllers.createFaculty,
);

route.post(
  "/create-admin",
  validateRequest(adminValidations.zodCreateAdminValidationSchema),
  userControllers.createAdmin,
);

route.get(
  "/me",
  auth(USER_ROLE.student, USER_ROLE.admin, USER_ROLE.faculty),
  userControllers.getMe,
);

route.post(
  "/change-status/:id",
  auth(USER_ROLE.admin),
  validateRequest(userValidations.zodUserStatusValidationSchema),
  userControllers.changeStatus,
);

export const userRoutes = route;
