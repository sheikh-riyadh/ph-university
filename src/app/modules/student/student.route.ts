import express from "express";
import { StudentControllers } from "./student.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { studentValidations } from "./student.validation";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

router.get("/", auth(USER_ROLE.admin), StudentControllers.getAllStudents);

router.get(
  "/:id",
  validateRequest(studentValidations.zodStudentIdValidationSchema),
  StudentControllers.getSingleStudent,
);

router.patch(
  "/:id",
  validateRequest(studentValidations.zodUpdateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete(
  "/:id",
  validateRequest(studentValidations.zodStudentIdValidationSchema),
  StudentControllers.deleteStudent,
);

export const studentRoutes = router;
