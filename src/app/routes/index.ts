import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { studentRoutes } from "../modules/student/student.route";
import { academicRoutes } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";

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
  {
    path: "/academic-faculties",
    route: academicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    route: academicDepartmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
