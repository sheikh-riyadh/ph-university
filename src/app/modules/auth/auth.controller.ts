import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const user = await authServices.loginUserIntoDB(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = user;
  res.cookie("refresh_token", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "user login successfull",
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await authServices.changePasswordFromDB(req.user, req.body);

  res.status(200).json({
    success: true,
    message: "password changed successfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refresh_token } = req.cookies;
  const result = await authServices.refreshTokenFromServer(refresh_token);
  res.status(200).json({
    success: true,
    message: "access token retrived successfully !",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await authServices.forgetPasswordIntoDB(req.body.id);
  res.status(200).json({
    success: true,
    message: "reset link generated successfully !",
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
    token: req.headers.authorization,
  };
  const result = await authServices.resetPasswordIntoDB(payload);
  res.status(200).json({
    success: true,
    message: "password reset successfully !",
    data: result,
  });
});

export const authControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
