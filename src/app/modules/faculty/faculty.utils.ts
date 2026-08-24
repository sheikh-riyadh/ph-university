import type { ClientSession } from "mongoose";
import { FacultyCounter } from "./faculty.model";

export const generateFacultyID = async (
  session: ClientSession,
): Promise<string> => {
  const counterKey = `F-0000`;

  const counter = await FacultyCounter.findOneAndUpdate(
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
      session,
    },
  );

  if (!counter) {
    throw new Error("Failed to generate student ID");
  }

  const sequence = counter.sequence.toString().padStart(4, "0");

  return `F-${sequence}`;
};
