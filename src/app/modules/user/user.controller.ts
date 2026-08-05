import type { Response, Request } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const { password, student } = req.body;

  try {
    const user = await userServices.createStudentIntoDB(password, student);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Somenting went wrong",
    });
  }
};

export const userController = {
  createUser,
};
