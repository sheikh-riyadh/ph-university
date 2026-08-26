import express from "express";
import { adminControllers } from "./admin.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { adminValidations } from "./admin.validation";

const router = express.Router();

router.get("/", adminControllers.getAllAdmins);
router.get(
  "/:adminId",

  adminControllers.getSingleAdmin,
);

router.patch(
  "/:adminId",
  validateRequest(adminValidations.zodUpdateAdminValidationShema),
  adminControllers.updateAdmin,
);

router.delete(
  "/:adminId",
  validateRequest(adminValidations.zodAdminIdValidationSchema),
  adminControllers.deleteAdmin,
);

export const adminRoutes = router;
