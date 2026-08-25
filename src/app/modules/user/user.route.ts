import express from "express";
import { userController } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { facultyValidations } from "../faculty/faculty.validation";

const route = express.Router();

route.post(
  "/create-student",
  validateRequest(studentValidations.zodCreateStudentValidationSchema),
  userController.createStudent,
);

route.post(
  "/create-faculty",
  validateRequest(facultyValidations.zodCreateFacultyValidationSchema),
  userController.createFaculty,
);

export const userRoutes = route;
