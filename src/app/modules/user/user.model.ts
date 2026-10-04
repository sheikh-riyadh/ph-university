import { model, Schema } from "mongoose";
import { type IUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";
import { STATUS, USER_ROLE } from "./user.constant";

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS["in-progress"],
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

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
});

export const User = model<IUser>("User", userSchema);
