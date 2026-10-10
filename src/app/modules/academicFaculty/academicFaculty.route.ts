import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { academicFacultyValidations } from "./academicFaculty.validation";
import { academicFacultyControllers } from "./academicFaculty.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(
    academicFacultyValidations.zodCreateAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.createAcademicFaculty,
);

router.get("/", academicFacultyControllers.getAllAcademicFaculties);

router.get(
  "/:id",
  validateRequest(
    academicFacultyValidations.zodAcademicFacultyIdValidationSchema,
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
