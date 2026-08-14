import express from "express";
import { userController } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import { validateRequest } from "../../middleware/validateRequest";

const route = express.Router();

route.post(
  "/create-student",
  validateRequest(studentValidations.zodCreateStudentValidationSchema),
  userController.createUser,
);

export const userRoutes = route;
