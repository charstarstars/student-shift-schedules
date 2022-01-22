import { centers, daysOfOperation, shiftTimes } from "common/config";
import { Shift, Center, DayOfWeek, ShiftDayTime } from "./common/interfaces";

const populateShiftDateTimes = (days: DayOfWeek[]) => {
  const shiftDateTimes: Array<ShiftDayTime> = [];
  days.forEach((day) => {
    shiftTimes.forEach(({ startTime, endTime }) => {
      shiftDateTimes.push({
        day,
        startTime,
        endTime
      });
    });
  });
  return shiftDateTimes;
};
export const hoursOfOperation = populateShiftDateTimes(daysOfOperation);

const populateShifts = () => {
  const shiftsByShiftDayTime: Map<ShiftDayTime, Set<Shift>> = new Map();
  hoursOfOperation.forEach((shiftDateTime) => {
    shiftsByShiftDayTime.set(
      shiftDateTime,
      new Set<Shift>(
        centers.map((location) => ({
          location,
          dayTime: shiftDateTime
        }))
      )
    );
  });

  return shiftsByShiftDayTime;
};

export const availableShifts: Map<ShiftDayTime, Set<Shift>> = populateShifts();
