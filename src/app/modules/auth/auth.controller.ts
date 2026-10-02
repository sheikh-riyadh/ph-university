import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const user = await authServices.loginUserIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: "user login successfull",
    data: user,
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

export const authControllers = {
  loginUser,
  changePassword,
};
