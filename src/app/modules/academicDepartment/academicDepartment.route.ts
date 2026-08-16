import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { academicDepartmentControllers } from "./academicDepartment.controller";
import { academicDepartmentValidations } from "./academicDepartment.validation";

const router = express.Router();

router.post(
  "/create-academic-department",
  validateRequest(
    academicDepartmentValidations.zodCreateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.createAcademicDepartment,
);

router.get("/", academicDepartmentControllers.getAllAcademicDepartments);

router.get(
  "/:academicDepartmentId",
  academicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  "/:academicDepartmentId",
  validateRequest(
    academicDepartmentValidations.zodUpdateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
