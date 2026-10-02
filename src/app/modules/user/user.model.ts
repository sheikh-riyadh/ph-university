import { model, Schema } from "mongoose";
import { Status, type IUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";
import { USER_ROLE } from "./user.constant";

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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
      enum: Object.values(Status),
      default: Status.IN_PROGRESS,
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
