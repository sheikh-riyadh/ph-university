import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { academicFacultyValidations } from "./academicFaculty.validation";
import { academicFacultyControllers } from "./academicFaculty.controller";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  validateRequest(
    academicFacultyValidations.zodCreateAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.createAcademicFaculty,
);

router.get("/", academicFacultyControllers.getAllAcademicFaculties);

router.get(
  "/:id",
  validateRequest(
    academicFacultyValidations.zodGetAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.getSingleAcademicFaculty,
);

router.patch(
  "/:id",
  validateRequest(
    academicFacultyValidations.zodUpdateAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateAcademicFaculty,
);
export const academicFacultyRoutes = router;
