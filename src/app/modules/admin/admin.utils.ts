import type { ClientSession } from "mongoose";
import { AdminCounter } from "./admin.model";
import { AppError } from "../../errors/appError";

export const generateAdminID = async (
  session: ClientSession,
): Promise<string> => {
  const counterKey = "A-0000";

  const counter = await AdminCounter.findOneAndUpdate(
    {
      key: counterKey,
    },
    {
      $inc: {
        sequence: 1,
      },
    },
    {
      new: true,
      upsert: true,
      session,
    },
  );

  if (!counter) {
    throw new AppError(400, "Failed to create admin id");
  }

  const sequence = counter.sequence.toString().padStart(4, "0");

  return `A-${sequence}`;
};
