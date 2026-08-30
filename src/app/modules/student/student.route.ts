import express from "express";
import { StudentControllers } from "./student.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { studentValidations } from "./student.validation";
const router = express.Router();

router.get("/", StudentControllers.getAllStudents);

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
