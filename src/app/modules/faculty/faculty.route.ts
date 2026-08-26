import express from "express";
import { facultyControllers } from "./faculty.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { facultyValidations } from "./faculty.validation";

const router = express.Router();

router.get("/", facultyControllers.getAllFaculties);
router.get("/:facultyId", facultyControllers.getSingleFaculty);
router.patch(
  "/:facultyId",
  validateRequest(facultyValidations.zodUpdateFacultyValidationSchema),
  facultyControllers.updateFaculty,
);

router.delete(
  "/:facultyId",
  validateRequest(facultyValidations.zodFacultyIdValidationSchema),
  facultyControllers.deleteFaculty,
);

export const facultyRoutes = router;
