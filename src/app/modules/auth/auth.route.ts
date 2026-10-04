import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";
import { authControllers } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

router.post(
  "/login",
  validateRequest(authValidations.zodAuthLoginValidationSchema),
  authControllers.loginUser,
);

router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(authValidations.zodChangePasswordValidationSchema),
  authControllers.changePassword,
);

router.post(
  "/refresh-token",
  validateRequest(authValidations.zodRefreshTokenValidationSchema),
  authControllers.refreshToken,
);

router.post(
  "/forget-password",
  validateRequest(authValidations.zodForgetPasswordValidationSchema),
  authControllers.forgetPassword,
);

export const authRoutes = router;
