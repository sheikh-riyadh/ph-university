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
    versionKey:false
  },
);

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

export const Admin = model<IAdmin>("Admin", adminSchema);
