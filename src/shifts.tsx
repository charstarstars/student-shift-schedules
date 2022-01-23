import { allDaysOfWeek, centers, daysOfOperation, shiftTimes } from "common/config";
import { createDayShiftTimeStringKey, DayTimeString } from "common/utils";
import { Shift, Center, DayOfWeek, ShiftDayTime, StartEndTime } from "./common/interfaces";


const generateHoursOfOperation = (daysInOperation: DayOfWeek[]) => {
  const hours = new Map<DayOfWeek, StartEndTime[]>();
  allDaysOfWeek.forEach((day) => {
    if (daysInOperation.includes(day)) {
      hours.set(day, [...shiftTimes]);
    }
  })
  return hours
}
// Map from day of week (number) to a shift (StartEndTime)
export const hoursOfOperation = generateHoursOfOperation(daysOfOperation);


const generateShiftDayTimes = () => {
  const shiftDayTimes: Map<DayTimeString, ShiftDayTime> = new Map();
  hoursOfOperation.forEach((startEndTimes, day) => {
    startEndTimes.forEach((time) => {
      shiftDayTimes.set(
        createDayShiftTimeStringKey(day, time),
        {
          day,
          time,
        })
    })
  })
  return shiftDayTimes;
}
export const shiftDayTimes = generateShiftDayTimes();

const populateShifts = () => {
  const shiftsByShiftDayTime: Map<ShiftDayTime, Set<Shift>> = new Map();

  for (const shiftDayTime of shiftDayTimes.values()) {
    shiftsByShiftDayTime.set(
      shiftDayTime,
      new Set<Shift>(
        centers.map((location) => ({
          location,
          dayTime: shiftDayTime
        }))
      )
    );
  }

  return shiftsByShiftDayTime;
};

export const availableShifts: Map<ShiftDayTime, Set<Shift>> = populateShifts();
