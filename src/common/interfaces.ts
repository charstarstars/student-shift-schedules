export enum DayOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}
export type Center = "MCC" | "LaCasa" | "PIAAA" | "PAC" | "MENASA";

export interface ShiftDayTime {
  day: DayOfWeek;
  startTime: number;
  endTime: number;
}

export interface Shift {
  dayTime: ShiftDayTime;
  location: Center;
}

export interface Student {
  psuId: number;
  firstName: string;
  lastName: string;
  maxShiftsPerWeek: number;
}
