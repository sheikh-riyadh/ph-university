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

export const academicRoutes = router;
