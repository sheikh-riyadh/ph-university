import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { studentRoutes } from "../modules/student/student.route";
import { academicRoutes } from "../modules/academicSemester/academicSemester.route";

export const router = express.Router();

export const moduleRoutes = [
  {
    path: "/students",
    route: studentRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/academic-semesters",
    route: academicRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
