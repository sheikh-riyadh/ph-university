import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { academicFacultyValidations } from "./academicFaculty.validation";
import { academicFacultyControllers } from "./academicFaculty.controller";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  validateRequest(
    academicFacultyValidations.zodAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.createAcademicFaculty,
);

router.get("/", academicFacultyControllers.getAllAcademicFaculties);
router.get("/:facultyId", academicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  "/:facultyId",
  validateRequest(
    academicFacultyValidations.zodAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
