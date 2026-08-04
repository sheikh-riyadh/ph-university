import express from "express";
import { userController } from "./user.controller";

const route = express.Router();

route.post("/create-user", userController.createUser);

export const userRoutes = route;
