import express from "express";
import { userController } from "./user.controller";

const route = express.Router();

route.post("/create-student", userController.createUser);

export const userRoutes = route;
