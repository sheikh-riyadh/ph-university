import type { Response, Request, NextFunction } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { password, student } = req.body;

  try {
    const user = await userServices.createStudentIntoDB(password, student);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createUser,
};
