import type { Response, Request } from "express";

const createUser = async (req: Request, res: Response) => {
  const studentData = req.body;
};

export const userController = {
  createUser,
};
