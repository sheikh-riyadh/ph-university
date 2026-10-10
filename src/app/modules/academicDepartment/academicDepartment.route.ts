import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { academicDepartmentControllers } from "./academicDepartment.controller";
import { academicDepartmentValidations } from "./academicDepartment.validation";
import { USER_ROLE } from "../user/user.constant";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-academic-department",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(
    academicDepartmentValidations.zodCreateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.createAcademicDepartment,
);

router.get(
  "/",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(
    academicDepartmentValidations.zodAcademicDepartmentIdValidationSchema,
  ),
  academicDepartmentControllers.getAllAcademicDepartments,
);

router.get(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(
    academicDepartmentValidations.zodAcademicDepartmentIdValidationSchema,
  ),
  academicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  "/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(
    academicDepartmentValidations.zodUpdateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
