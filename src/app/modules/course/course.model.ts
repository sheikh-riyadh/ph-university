import { model, Schema } from "mongoose";
import type {
  IAssignFacultiesWithCourse,
  ICourse,
  IPreRequisiteCourses,
} from "./course.interface";

const preRequisiteCoursesSchema = new Schema<IPreRequisiteCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    prefix: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    preRequisiteCourses: {
      type: [preRequisiteCoursesSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Query Middleware
courseSchema.pre("find", function () {
  this.find({ isDeleted: { $ne: true } });
});

courseSchema.pre("findOne", function () {
  this.find({ isDeleted: { $ne: true } });
});

courseSchema.pre("aggregate", function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

export const Course = model<ICourse>("Course", courseSchema);

const assignFacultiesWithCourseSchema = new Schema<IAssignFacultiesWithCourse>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
    unique: true,
  },
  faculties: Array<{
    type: Schema.Types.ObjectId;
    ref: "Faculty";
  }>,
});

export const CourseFaculty = model<IAssignFacultiesWithCourse>(
  "CourseFaculty",
  assignFacultiesWithCourseSchema,
);
