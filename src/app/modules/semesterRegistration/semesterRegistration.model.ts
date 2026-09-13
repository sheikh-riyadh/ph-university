import { model, Schema } from "mongoose";
import {
  SemesterRegistrationStatus,
  type ISemesterRegistration,
} from "./semesterRegistration.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { AppError } from "../../errors/appError";

const semesterRegistrationSchema = new Schema<ISemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(SemesterRegistrationStatus),
      default: SemesterRegistrationStatus.UPCOMING,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

semesterRegistrationSchema.pre("save", async function () {
  const isAcademicSemesterExists = await AcademicSemester.findOne({
    _id: this.academicSemester,
  });

  if (!isAcademicSemesterExists) {
    throw new AppError(404, "academic semester not found !");
  }

  const isAcademicSemesterRegistrationAlreadyExists =
    await SemesterRegistration.findOne({
      academicSemester: this.academicSemester,
    });

  if (isAcademicSemesterRegistrationAlreadyExists) {
    throw new AppError(
      409,
      `${isAcademicSemesterExists.name} already registered !`,
    );
  }

  const isAnyUpcomingOrOnGoingSemesterRegistrationExists =
    await SemesterRegistration.findOne({
      $or: [
        { status: SemesterRegistrationStatus.UPCOMING },
        { status: SemesterRegistrationStatus.ONGOING },
      ],
    });

  if (isAnyUpcomingOrOnGoingSemesterRegistrationExists) {
    throw new AppError(
      400,
      `there is already a ${this.status} semester registration exists`,
    );
  }
});

semesterRegistrationSchema.pre("findOneAndUpdate", async function () {
  const query = this.getQuery();
  const updatedData = this.getUpdate() as Partial<ISemesterRegistration>;

  const isSemesterRegistrationExists = await this.model.findOne(query);
  if (!isSemesterRegistrationExists) {
    throw new AppError(404, "semester registration not found !");
  }

  const academicSemester = await AcademicSemester.findOne({
    _id: updatedData.academicSemester,
  });

  if (!academicSemester) {
    throw new AppError(404, "academic semester not found !");
  }
});

export const SemesterRegistration = model<ISemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema,
);
