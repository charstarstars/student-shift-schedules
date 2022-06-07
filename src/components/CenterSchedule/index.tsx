
import React, { useContext } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import { lightBlue } from "@mui/material/colors";

import { daysOfOperation, shiftTimes } from "common/config";
import { createDayShiftTimeStringKey, getDayOfWeekString } from "common/utils";
import { Center, DayOfWeek, Shift, Student, ShiftSchedule } from "common/interfaces";
import { StudentBadge } from "components/StudentBadge";
import { StudentSelectionContext } from "common/contexts/StudentSelectionContext";


interface CenterScheduleProps {
  shiftSchedule: ShiftSchedule;
  centerName: Center;
}
export const CenterSchedule: React.FC<CenterScheduleProps> = (props) => {
  const { selectedStudent } = useContext(StudentSelectionContext)

  const { shiftToStudentPreference } = props.shiftSchedule;
  const shiftsForThisCenter = props.shiftSchedule.schedule.filter((shift) => {
    return shift.shift.location === props.centerName;
  });

  type StartTime = number;
  const map: Map<DayOfWeek, Map<StartTime, { shift: Shift, student: Student }>> = new Map();

  shiftsForThisCenter.forEach((shift) => {
    const { time, day } = shift.shift.dayTime;
    if (!map.has(day)) {
      map.set(day, new Map());
    }
    const dayMap = map.get(day);
    dayMap?.set(time.startTime, shift);
  });

  const table = (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{
            fontSize: 24,
            fontWeight: 700,
          }}>
            {props.centerName}
          </TableCell>
          {daysOfOperation.map((day) => {
            return <TableCell key={day}>{getDayOfWeekString(day)}</TableCell>;
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {shiftTimes.map((shiftTime) => {
          const start = `${shiftTime.startTime / 100}${shiftTime.startTime < 1200 ? "am" : "pm"
            }`;
          const end = `${shiftTime.endTime / 100}${shiftTime.endTime < 1200 ? "am" : "pm"
            }`;
          return (
            <TableRow key={`${shiftTime.startTime}-${shiftTime.endTime}`}>
              <TableCell>
                {start} - {end}
              </TableCell>
              {daysOfOperation.map((day) => {

                const shift = map.get(day)?.get(shiftTime.startTime);
                const studentsWhoPreferShift = shift?.shift.dayTime
                  && shiftToStudentPreference.get(
                    createDayShiftTimeStringKey(shift.shift.dayTime.day, shift.shift.dayTime.time)
                  );
                const doesSelectedStudentPreferShift = selectedStudent
                  && studentsWhoPreferShift
                  && shift?.student
                  && studentsWhoPreferShift.includes(selectedStudent);

                return (
                  <TableCell key={day} sx={doesSelectedStudentPreferShift ? {
                    backgroundColor: lightBlue[50],
                  } : undefined}>
                    <StudentBadge
                      student={shift?.student}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );

  return (
    <Box marginY={2}>
      {table}
    </Box>
  );
};

export default CenterSchedule;
