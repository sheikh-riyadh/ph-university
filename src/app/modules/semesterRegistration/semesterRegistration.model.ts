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
  const payload = this.getUpdate() as Partial<ISemesterRegistration>;

  const semesterRegistration = await this.model.findOne(query);
  if (!semesterRegistration) {
    throw new AppError(404, "semester registration not found !");
  }

  if (semesterRegistration.status === SemesterRegistrationStatus.ENDED) {
    throw new AppError(
      400,
      `this semester registration already ${semesterRegistration.status} !`,
    );
  }

  const academicSemesterId =
    payload?.academicSemester ?? semesterRegistration.academicSemester;

  const academicSemester = await AcademicSemester.findOne({
    _id: academicSemesterId,
  });

  if (!academicSemester) {
    throw new AppError(404, "academic semester not found !");
  }

  if (
    semesterRegistration.status === SemesterRegistrationStatus.UPCOMING &&
    payload?.status === SemesterRegistrationStatus.ENDED
  ) {
    throw new AppError(
      400,
      `you can not directly change status from ${semesterRegistration.status} to ${payload?.status} !`,
    );
  }

  if (
    semesterRegistration.status === SemesterRegistrationStatus.ONGOING &&
    payload.status === SemesterRegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      400,
      `you can not directly change status from ${semesterRegistration.status} to ${payload.status}`,
    );
  }
});

export const SemesterRegistration = model<ISemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema,
);
