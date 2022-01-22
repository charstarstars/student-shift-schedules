import { Center, DayOfWeek } from "common/interfaces";

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

export const daysOfOperation = [
    DayOfWeek.Monday,
    DayOfWeek.Tuesday,
    DayOfWeek.Wednesday,
    DayOfWeek.Thursday,
    DayOfWeek.Friday
];