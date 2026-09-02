import { model, Schema } from "mongoose";
import { basePersonSchema } from "../../schemas/common.schema";
import type { IAdmin, IAdminCounter } from "./admin.interface";

const adminSchema = new Schema<IAdmin>(
  {
    ...basePersonSchema,
    designation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Query Middleware
adminSchema.pre("find", function () {
  this.find({ isDeleted: { $ne: true } });
});

adminSchema.pre("findOne", function () {
  this.find({ isDeleted: { $ne: true } });
});

adminSchema.pre("aggregate", function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

export const Admin = model<IAdmin>("Admin", adminSchema);

const adminCounterSchema = new Schema<IAdminCounter>({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  sequence: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const AdminCounter = model<IAdminCounter>(
  "AdminCounter",
  adminCounterSchema,
);
