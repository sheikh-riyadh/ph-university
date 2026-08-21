import express from "express";
import { StudentControllers } from "./student.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { studentValidations } from "./student.validation";
const router = express.Router();

// Will call controller function
router.get(
  "/",
  validateRequest(studentValidations.zodStudentQueryValidationSchema),
  StudentControllers.getAllStudents,
);
router.get("/:studentId", StudentControllers.getSingleStudent);
router.patch(
  "/:studentId",
  validateRequest(studentValidations.zodUpdateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete("/:studentId", StudentControllers.deleteStudent);

export const studentRoutes = router;
