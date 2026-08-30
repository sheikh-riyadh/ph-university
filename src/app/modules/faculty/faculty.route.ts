import express from "express";
import { facultyControllers } from "./faculty.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { facultyValidations } from "./faculty.validation";

const router = express.Router();

router.get("/", facultyControllers.getAllFaculties);

router.get(
  "/:id",
  validateRequest(facultyValidations.zodFacultyIdValidationSchema),
  facultyControllers.getSingleFaculty,
);

router.patch(
  "/:id",
  validateRequest(facultyValidations.zodUpdateFacultyValidationSchema),
  facultyControllers.updateFaculty,
);

router.delete(
  "/:id",
  validateRequest(facultyValidations.zodFacultyIdValidationSchema),
  facultyControllers.deleteFaculty,
);

export const facultyRoutes = router;
