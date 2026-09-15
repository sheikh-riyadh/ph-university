import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { offeredCourseValidations } from "./offeredCourse.validation";

const router = express.Router();

router.post(
  "/create-offered-course",
  validateRequest(
    offeredCourseValidations.zodCreateOfferedCourseValidationSchema,
  ),
);

router.get("/");

router.get(
  "/:id",
  validateRequest(offeredCourseValidations.zodOfferedCourseIdValidationSchema),
);

router.patch(
  "/:id",
  validateRequest(
    offeredCourseValidations.zodUpdateOfferedCourseValidationSchema,
  ),
);

export const offeredCourseRoutes = router;
