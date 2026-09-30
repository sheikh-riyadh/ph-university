import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const user = await authServices.loginUserIntoDB(req.body.login);
  res.status(200).json({
    success: true,
    message: "user login successfull",
    data: user,
  });
});

export const authControllers = {
  loginUser,
};
