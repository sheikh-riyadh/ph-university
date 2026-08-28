import { model, Schema } from "mongoose";
import {
  type TGuardian,
  type TLocalGuardian,
  type IStudent,
  type StudentModelType,
  type IStudentCounter,
} from "./student.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { AppError } from "../../errors/appError";
import { basePersonSchema } from "../../schemas/common.schema";

const guardianSchema = new Schema<TGuardian>(
  {
    fatherName: {
      type: String,
      required: true,
    },
    fatherOccupation: {
      type: String,
      required: true,
    },
    fatherContactNo: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    motherOccupation: {
      type: String,
      required: true,
    },
    motherContactNo: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const localGuardianSchema = new Schema<TLocalGuardian>(
  {
    name: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

// Student schema
const studentSchema = new Schema<IStudent, StudentModelType>(
  {
    ...basePersonSchema,
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Student counter schema
const studentCounterSchema = new Schema<IStudentCounter>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    sequence: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Custom static method
studentSchema.static("isStudentExists", async function (id: string) {
  const isExists = await this.exists({ id });

  if (isExists) {
    throw new AppError(409, "Student already exists");
  }

  return isExists;
});

studentSchema.pre("save", async function () {
  const isAcademicDepartmentExists = await AcademicDepartment.exists({
    _id: this.academicDepartment,
  });

  if (!isAcademicDepartmentExists) {
    throw new AppError(404, "academic department not found !");
  }
});

studentSchema.pre("findOneAndUpdate", async function () {
  const query = this.getQuery();
  const payload = this.getUpdate() as Partial<IStudent>;

  const student = await Student.findOne(query);

  if (!student) {
    throw new AppError(404, "student not found !");
  }

  const academicDepartment =
    payload?.academicDepartment ?? student.academicDepartment;

  const academicSemester =
    payload.admissionSemester ?? student.admissionSemester;

  const isAcademicDepartmentExists = await AcademicDepartment.exists({
    _id: academicDepartment,
  });

  const isAcademicSemesterExists = await AcademicSemester.exists({
    _id: academicSemester,
  });

  if (!isAcademicSemesterExists) {
    throw new AppError(404, "admission semester not found !");
  }

  if (!isAcademicDepartmentExists) {
    throw new AppError(404, "academic department not found !");
  }
});

export const Student = model<IStudent, StudentModelType>(
  "Student",
  studentSchema,
);

export const StudentCounter = model<IStudentCounter>(
  "StudentCounter",
  studentCounterSchema,
);
