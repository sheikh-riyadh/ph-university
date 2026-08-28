import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
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

router.get(
  "/",
  validateRequest(
    academicDepartmentValidations.zodGetAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.getAllAcademicDepartments,
);

router.get(
  "/:id",
  validateRequest(
    academicDepartmentValidations.zodGetAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  "/:id",
  validateRequest(
    academicDepartmentValidations.zodUpdateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
