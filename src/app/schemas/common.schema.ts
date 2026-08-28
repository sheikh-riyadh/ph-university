import { Schema } from "mongoose";
import { BloodGroup, Gender, type TName } from "../interfaces/common.interface";

const userNameSchema = new Schema<TName>(
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

export const basePersonSchema = {
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
    enum: Object.values(Gender),
  },
  bloodGroup: {
    type: String,
    enum: Object.values(BloodGroup),
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
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
};
