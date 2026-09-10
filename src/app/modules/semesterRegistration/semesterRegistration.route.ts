import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { semesterRegistrationValidations } from "./semesterRegistration.validation";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";

const router = express.Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    semesterRegistrationValidations.zodCreateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get("/", semesterRegistrationControllers.getAllSemesterRegistration);

router.get(
  "/:id",
  validateRequest(
    semesterRegistrationValidations.zodSemesterRegistrationIdValidationSchema,
  ),
  semesterRegistrationControllers.getSingleSemesterRegistration,
);

router.patch(
  "/:id",
  validateRequest(
    semesterRegistrationValidations.zodUpdateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
