import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { academicSemesterValidations } from "./academicSemester.validation";
import { academicSemesterControllers } from "./academicSemester.controller";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    academicSemesterValidations.zodCreateAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.createAcademicSemester,
);

router.get("/", academicSemesterControllers.getAllAcademicSemesters);
router.get(
  "/:id",
  validateRequest(
    academicSemesterValidations.zodGetAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.getSingleAcademicSemester,
);
router.patch(
  "/:id",
  validateRequest(
    academicSemesterValidations.zodUpdateAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.updateAcademicSemester,
);

export const academicRoutes = router;
