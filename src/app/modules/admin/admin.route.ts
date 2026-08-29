import express from "express";
import { adminControllers } from "./admin.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { adminValidations } from "./admin.validation";

const router = express.Router();

router.get("/", adminControllers.getAllAdmins);

router.get(
  "/:id",
  validateRequest(adminValidations.zodAdminIdValidationSchema),
  adminControllers.getSingleAdmin,
);

router.patch(
  "/:id",
  validateRequest(adminValidations.zodUpdateAdminValidationShema),
  adminControllers.updateAdmin,
);

router.delete(
  "/:id",
  validateRequest(adminValidations.zodAdminIdValidationSchema),
  adminControllers.deleteAdmin,
);

export const adminRoutes = router;
