import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { offeredCourseValidations } from "./offeredCourse.validation";
import { offeredCourseControllers } from "./offeredCourse.controller";

const router = express.Router();

router.post(
  "/create-offered-course",
  validateRequest(
    offeredCourseValidations.zodCreateOfferedCourseValidationSchema,
  ),
  offeredCourseControllers.createOfferedCourse,
);

router.get("/", offeredCourseControllers.getAllOfferedCourses);

router.get(
  "/:id",
  validateRequest(offeredCourseValidations.zodOfferedCourseIdValidationSchema),
  offeredCourseControllers.getSingleOfferedCourse,
);

router.patch(
  "/:id",
  validateRequest(
    offeredCourseValidations.zodUpdateOfferedCourseValidationSchema,
  ),
  offeredCourseControllers.updateOfferedCourse,
);

export const offeredCourseRoutes = router;
