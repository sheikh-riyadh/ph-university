import { catchAsync } from "../../utils/catchAsync";
import { userServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  const user = await userServices.createStudentIntoDB(password, student);
  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

export const userController = {
  createUser,
};
