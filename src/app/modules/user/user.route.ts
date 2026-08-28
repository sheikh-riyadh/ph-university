import express from "express";
import { userControllers } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { facultyValidations } from "../faculty/faculty.validation";
import { adminValidations } from "../admin/admin.validation";

const route = express.Router();

route.post(
  "/create-student",
  validateRequest(studentValidations.zodCreateStudentValidationSchema),
  userControllers.createStudent,
);

route.post(
  "/create-faculty",
  validateRequest(facultyValidations.zodCreateFacultyValidationSchema),
  userControllers.createFaculty,
);

route.post(
  "/create-admin",
  validateRequest(adminValidations.zodCreateAdminValidationSchema),
  userControllers.createAdmin,
);

export const userRoutes = route;
