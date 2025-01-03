import { TSchedule } from './OfferedCourse.constant';

const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

    // 10:30 - 12: 30 Existing in Database
    // 9:30 - 11: 30 come from postman
    // Solution 9:30 < 12: 30 && 11: 30 > 10:30
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }
  return false;
};

export default hasTimeConflict;
