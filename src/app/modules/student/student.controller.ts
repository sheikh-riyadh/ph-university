import type { Request, Response } from "express";
import { StudentServices } from "./student.service";
import { Student } from "./student.model";

const createStudent = async (req: Request, res: Response) => {
  const { student: studentData } = req.body;

  try {
    const result = await StudentServices.createStudentIntoDB(studentData);
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "All students retrived successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  const result = await StudentServices.getSingleStudentFromDB(
    req.params.id as string,
  );
  try {
    res.status(200).json({
      success: true,
      message: "Single student retrived successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

const updateStudent = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const result = await Student.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: "Updated student successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Someting went wrong",
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentServices.deleteStudentFromDB(id as string);
  try {
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
