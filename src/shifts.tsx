import { Shift, Center, DayOfWeek, ShiftDayTime } from "./interfaces";

export const shiftTimes = [
  {
    startTime: 900,
    endTime: 1100
  },
  {
    startTime: 1100,
    endTime: 1300
  },
  {
    startTime: 1300,
    endTime: 1500
  },
  {
    startTime: 1500,
    endTime: 1700
  }
];
// const centers: Center[] = ["MCC", "PIAAA", "PAC", "MENASA", "LaCasa"];
export const centers: Center[] = ["MCC", "PIAAA"];

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
export const daysOfOperation = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday
];
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
  console.log({ shiftsByShiftDayTime });
  return shiftsByShiftDayTime;
};

export const availableShifts: Map<ShiftDayTime, Set<Shift>> = populateShifts();
