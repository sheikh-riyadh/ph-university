import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { userController } from "./user.controller";
import { zodStudentValidationSchema } from "../student/student.validation";
import type z from "zod";

const route = express.Router();

const validateRequest = (schema: z.ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

route.post(
  "/create-student",
  validateRequest(zodStudentValidationSchema.zodStudentSchema),
  userController.createUser,
);

export const userRoutes = route;
