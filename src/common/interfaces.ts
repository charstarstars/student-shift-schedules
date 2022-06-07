import { DayTimeString } from "./utils";

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

export interface StartEndTime {
  startTime: number;
  endTime: number;
}

export interface ShiftDayTime {
  day: DayOfWeek;
  time: StartEndTime;
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

export interface ShiftSchedule {
  schedule: Array<{ shift: Shift; student: Student }>;
  shiftToStudentPreference: Map<DayTimeString, Student[]>;
  studentShifts: Map<Student, Shift[]>;
}

export interface StudentSelectionContextProps {
  hoveredStudent?: Student;
  setHoveredStudent: React.Dispatch<Student | undefined>;
  selectedStudent?: Student;
  setSelectedStudent: React.Dispatch<Student | undefined>;
}


export interface StudentShiftPreference {
  student: Student;
  // access is shiftPreference[DayOfWeek][shiftNumber]
  shiftPreferences: StartEndTime[][];
}

export interface StudentsContextProps {
  students: Student[];
  setStudents: React.Dispatch<Student[]>;
  studentsAvailabilities: StudentShiftPreference[];
  setStudentsAvailabilities: React.Dispatch<StudentShiftPreference[]>;
}