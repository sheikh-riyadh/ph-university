import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { academicSemesterValidations } from "./academicSemester.validation";
import { academicSemesterControllers } from "./academicSemester.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-semester",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(
    academicSemesterValidations.zodCreateAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.createAcademicSemester,
);

router.get("/", academicSemesterControllers.getAllAcademicSemesters);

router.get(
  "/:id",
  auth(
    USER_ROLE.super_admin,
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  validateRequest(
    academicSemesterValidations.zodAcademicSemesterIdValidationSchema,
  ),
  academicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
  "/:id",
  auth(
    USER_ROLE.super_admin,
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(
    academicSemesterValidations.zodUpdateAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.updateAcademicSemester,
);

export const academicRoutes = router;
