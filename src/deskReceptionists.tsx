import { Student, Shift, ShiftDayTime, DayOfWeek, StartEndTime, StudentShiftPreference } from "common/interfaces";
import { createDayShiftTimeStringKey, DayTimeString } from "common/utils";
import { availableShifts, hoursOfOperation, shiftDayTimes } from "./shifts";


const populateShiftStudentPreferenceMap = (studentShiftPreferences: StudentShiftPreference[]) => {
  const map = new Map<DayTimeString, Student[]>();
  const studentToPreferences = new Map<Student, StartEndTime[][]>();

  // put all the shifts into the map with empty set of students
  hoursOfOperation.forEach((times, day) => {
    times.forEach((time) => {
      map.set(createDayShiftTimeStringKey(day, time), []);
    })
  });

  // add students to map
  studentShiftPreferences.forEach(({ student, shiftPreferences }) => {
    studentToPreferences.set(student, shiftPreferences);

    shiftPreferences.forEach((times, day) => {
      // console.log(times);
      times.forEach((time) => {
        const dayTimeMapKey = createDayShiftTimeStringKey(day, time);
        const students = map.get(dayTimeMapKey);

        if (students) {
          students.push(student);
        } else {
          map.set(dayTimeMapKey, [student]);
        }
      })
    })
  });

  // sort the students by number of shifts they can take
  map.forEach((students) => {
    students.sort((a, b) => {
      const aSize = studentToPreferences.get(a)?.length ?? 0;
      const bSize = studentToPreferences.get(b)?.length ?? 0;
      return bSize - aSize;
    });
  });


  return map;
};


// fill out schedule
export const createSchedule = (students: Student[], studentShiftPreferences: StudentShiftPreference[]) => {
  // schedule is a list of [shift, student] pairs
  const schedule: Array<{
    shift: Shift;
    student: Student;
  }> = [];

  const shiftToStudentPreference = populateShiftStudentPreferenceMap(studentShiftPreferences);

  // go through Map<Shift, Students> , sort shifts by fewest number of students, set those first
  const sortedShifts = [...shiftDayTimes.values()].sort(
    (shiftDayTimeA, shiftDayTimeB) => {
      const shiftASize =
        shiftToStudentPreference.get(createDayShiftTimeStringKey(shiftDayTimeA.day, shiftDayTimeA.time))?.length ?? 0;
      const shiftBSize =
        shiftToStudentPreference.get(createDayShiftTimeStringKey(shiftDayTimeB.day, shiftDayTimeB.time))?.length ?? 0;
      return shiftASize - shiftBSize;
    }
  );

  // go through sorted shifts
  // for each location and each shifttime
  //    if the first student in the list of students is available (has not maxed out their shifts),
  //    add them to the location-shifttime
  //    if the student has maxed out their shifts, remove them from subsequent sets??

  // For each student, what are their assigned shifts?
  const studentShifts: Map<Student, Shift[]> = new Map();
  // initialize map with all student receptionists
  students.forEach((deskReceptionist) => {
    studentShifts.set(deskReceptionist, []);
  });

  sortedShifts.forEach((shiftDayTime) => {
    const shiftsAvailable = availableShifts.get(shiftDayTime);
    const studentsAvailable = [...shiftToStudentPreference.get(createDayShiftTimeStringKey(shiftDayTime.day, shiftDayTime.time))!];

    if (!studentsAvailable || studentsAvailable.length === 0) {
      // fill the shifts with null
      return;
    }
    if (!shiftsAvailable) {
      return;
    }
    for (const shift of shiftsAvailable) {
      let student: Student | undefined;
      while (student = studentsAvailable.pop()) {

        // get students currently scheduled shifts
        const thisStudentsShifts = studentShifts.get(student);
        if (
          thisStudentsShifts &&
          thisStudentsShifts.length < student.maxShiftsPerWeek
        ) {
          // add to current students' shift
          thisStudentsShifts.push(shift);
          schedule.push({
            shift,
            student: student ?? null
          });
          break;
        }
      }
    }
  });
  return { schedule, shiftToStudentPreference, studentShifts };
};
