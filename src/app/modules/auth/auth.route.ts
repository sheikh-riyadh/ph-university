import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";
import { authControllers } from "./auth.controller";
const router = express.Router();

router.post(
  "/login",
  validateRequest(authValidations.zodAuthLoginValidationSchema),
  authControllers.loginUser,
);
export const authRoutes = router;
