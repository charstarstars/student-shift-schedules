import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import { getDayOfWeekString } from "common/utils";
import { Center, DayOfWeek, Shift, Student } from "common/interfaces";
import { StudentBadge } from "components/StudentBadge";
import React from "react";
import { daysOfOperation, shiftTimes } from "common/config";

interface CenterScheduleProps {
  shifts: Array<{ shift: Shift; student: Student }>;
  centerName: Center;
  hoveredStudent?: Student;
  setHoveredStudent: React.Dispatch<Student | undefined>;
  selectedStudent?: Student;
  setSelectedStudent: React.Dispatch<Student | undefined>;
}
export const CenterSchedule: React.FC<CenterScheduleProps> = (props) => {
  const shiftsForThisCenter = props.shifts.filter((shift) => {
    return shift.shift.location === props.centerName;
  });
  const { hoveredStudent, setHoveredStudent, selectedStudent, setSelectedStudent } = props;

  const map: Map<DayOfWeek, Map<number, Student>> = new Map();

  shiftsForThisCenter.forEach(({ shift, student }) => {
    const { startTime, day } = shift.dayTime;
    if (!map.has(day)) {
      map.set(day, new Map());
    }
    const dayMap = map.get(day);
    dayMap?.set(startTime, student);
  });

  const table = (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
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
                return (
                  <TableCell key={day}>
                    <StudentBadge
                      student={map.get(day)?.get(shiftTime.startTime)}
                      hoveredStudent={hoveredStudent}
                      setHoveredStudent={setHoveredStudent}
                      selectedStudent={selectedStudent}
                      setSelectedStudent={setSelectedStudent}
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
    <Box sx={{
      marginY: 16,
    }}>
      <h2>{props.centerName}</h2>
      {table}
    </Box>
  );
};

export default CenterSchedule;
