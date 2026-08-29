import express from "express";
import { StudentControllers } from "./student.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { studentValidations } from "./student.validation";
const router = express.Router();

// Will call controller function
router.get(
  "/",
  validateRequest(studentValidations.zodStudentQueryValidationSchema),
  StudentControllers.getAllStudents,
);

router.get("/:id", StudentControllers.getSingleStudent);

router.patch(
  "/:id",
  validateRequest(studentValidations.zodUpdateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete("/:id", StudentControllers.deleteStudent);

export const studentRoutes = router;
