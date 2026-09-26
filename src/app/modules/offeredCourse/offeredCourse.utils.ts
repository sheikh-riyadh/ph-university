import type { ISchedule } from "./offeredCourse.interface";

export const hasTimeConflict = (
  assignedSchedules: ISchedule[],
  newSchedule: ISchedule,
) => {
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}:00`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}:00`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}:00`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}:00`);
    //        10:20           12:20             12:20           10:20
    if (newStartTime <= existingEndTime && newEndTime >= existingStartTime) {
      return true;
    }
  }

  return false;
};
