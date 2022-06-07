import { shiftTimes } from "common/config";
import { DayOfWeek, Student, StudentShiftPreference } from "common/interfaces";

export const deskReceptionists: Student[] = [
    {
        firstName: "Ariel",
        lastName: "Liu",
        maxShiftsPerWeek: 4,
        psuId: 1
    },
    {
        firstName: "Mek",
        lastName: "Karpeles",
        maxShiftsPerWeek: 4,
        psuId: 2
    },
    {
        firstName: "Sahar",
        lastName: "Massachi",
        maxShiftsPerWeek: 4,
        psuId: 3
    },
    {
        firstName: "Drew",
        lastName: "Winget",
        maxShiftsPerWeek: 4,
        psuId: 4
    },
    {
        firstName: "Trevor",
        lastName: "Luu",
        maxShiftsPerWeek: 4,
        psuId: 5
    }
];


export const studentShiftPreferences: StudentShiftPreference[] = [
    {
        student: deskReceptionists[0],
        shiftPreferences: [
            [], // sunday
            [shiftTimes[0], shiftTimes[3]], // monday
            [], // tuesday,
            [], // wednesday
            [], // thursday
            [], // friday
            [], // saturday
        ]
    },
    {
        student: deskReceptionists[1],
        shiftPreferences: [
            [], // sunday
            [shiftTimes[2], shiftTimes[3]], // monday
            [], // tuesday,
            [], // wednesday
            [], // thursday
            [], // friday
            [], // saturday
        ]
    },
    {
        student: deskReceptionists[2],
        shiftPreferences: [
            [], // sunday
            [], // monday
            [shiftTimes[1], shiftTimes[2]], // tuesday,
            [], // wednesday
            [shiftTimes[0], shiftTimes[1]], // thursday
            [], // friday
            [], // saturday
        ]
    },
    {
        student: deskReceptionists[3],
        shiftPreferences: [
            [], // sunday
            [], // monday
            [], // tuesday,
            [shiftTimes[0], shiftTimes[1]], // wednesday
            [], // thursday
            [], // friday
            [], // saturday
        ]
    },
    {
        student: deskReceptionists[4],
        shiftPreferences: [
            [], // sunday
            [shiftTimes[0], shiftTimes[1]], // monday
            [], // tuesday,
            [], // wednesday
            [], // thursday
            [], // friday
            [], // saturday
        ]
    }
];
