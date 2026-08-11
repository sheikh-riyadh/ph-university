import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { academicSemesterValidations } from "./academicSemester.validation";
import { academicSemesterControllers } from "./academicSemester.controller";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    academicSemesterValidations.zodAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.createAcademicSemester,
);

router.get("/", academicSemesterControllers.getAllAcademicSemesters);
router.get(
  "/:semesterId",
  academicSemesterControllers.getSingleAcademicSemester,
);
router.patch(
  "/:semesterId",
  validateRequest(
    academicSemesterValidations.zodAcademicSemesterUpdateValidationSchema,
  ),
  academicSemesterControllers.updateAcademicSemester,
);

export const academicRoutes = router;
