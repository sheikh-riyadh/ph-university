import { model, Schema } from "mongoose";
import type {
  TGuardian,
  TLocalGuardian,
  IStudent,
  TUserName,
  StudentModelType,
  IStudentCounter,
} from "./student.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { AppError } from "../../error/appError";

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

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
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    name: {
      type: userNameSchema,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    profileImage: {
      type: String,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    isDeleted: {
      type: Boolean,
      default: false,
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
studentSchema.static("isStudentExist", async function (id: string) {
  const studentExists = await this.exists({ id });
  return studentExists;
});

studentSchema.pre("save", async function () {
  const isAcademicDepartmentExists = await AcademicDepartment.exists({
    _id: this.academicDepartment,
  });

  if (!isAcademicDepartmentExists) {
    throw new AppError(404, "Academic department not found!");
  }
});

studentSchema.pre("findOneAndUpdate", async function () {
  const query = this.getQuery();
  const payload = this.getUpdate() as Partial<IStudent>;

  const student = await Student.findOne(query);

  if (!student) {
    throw new AppError(404, "Student not found!");
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
    throw new AppError(404, "Admission semester not found!");
  }

  if (!isAcademicDepartmentExists) {
    throw new AppError(404, "Academic department not found!");
  }

  // const isAcademicDepartmentExists = await AcademicDepartment.findById();
});

export const Student = model<IStudent, StudentModelType>(
  "Student",
  studentSchema,
);

export const StudentCounter = model<IStudentCounter>(
  "StudentCounter",
  studentCounterSchema,
);
