import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { userControllers } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { facultyValidations } from "../faculty/faculty.validation";
import { adminValidations } from "../admin/admin.validation";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { userValidations } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const route = express.Router();

route.post(
  "/create-student",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.zodCreateStudentValidationSchema),
  userControllers.createStudent,
);

route.post(
  "/create-faculty",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(facultyValidations.zodCreateFacultyValidationSchema),
  userControllers.createFaculty,
);

route.post(
  "/create-admin",
  auth(USER_ROLE.super_admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(adminValidations.zodCreateAdminValidationSchema),
  userControllers.createAdmin,
);

route.get(
  "/me",
  auth(
    USER_ROLE.super_admin,
    USER_ROLE.student,
    USER_ROLE.admin,
    USER_ROLE.faculty,
  ),
  userControllers.getMe,
);

route.post(
  "/change-status/:id",
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(userValidations.zodUserStatusValidationSchema),
  userControllers.changeStatus,
);

export const userRoutes = route;
