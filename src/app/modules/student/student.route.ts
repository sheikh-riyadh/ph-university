import express from "express";
import { StudentControllers } from "./student.controller";
const router = express.Router();

// Will call controller function
router.post("/create-student", StudentControllers.createStudent);
router.get("/", StudentControllers.getAllStudents);
router.get("/single-student/:id", StudentControllers.getSingleStudent);
router.patch("/update-student/:id", StudentControllers.updateStudent);
router.delete("/delete-student/:id", StudentControllers.deleteStudent);

export const studentRoutes = router;