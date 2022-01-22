import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import { getDayOfWeekString } from "../utils";
import { Center, DayOfWeek, Shift, Student } from "../interfaces";
import { daysOfOperation, shiftTimes } from "../shifts";
import { StudentBadge } from "StudentBadge";
import React from "react";

interface CenterScheduleProps {
  shifts: Array<{ shift: Shift; student: Student }>;
  centerName: Center;
  hoveredStudent?: Student;
  setHoveredStudent: React.Dispatch<Student>;
}
export const CenterSchedule: React.FC<CenterScheduleProps> = (props) => {
  const shiftsForThisCenter = props.shifts.filter((shift) => {
    return shift.shift.location === props.centerName;
  });
  const { hoveredStudent, setHoveredStudent } = props;

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
          const start = `${shiftTime.startTime / 100}${
            shiftTime.startTime < 1200 ? "am" : "pm"
          }`;
          const end = `${shiftTime.endTime / 100}${
            shiftTime.endTime < 1200 ? "am" : "pm"
          }`;
          return (
            <TableRow key={`${shiftTime.startTime}-${shiftTime.endTime}`}>
              <TableCell>
                {start} - {end}
              </TableCell>
              {daysOfOperation.map((day) => {
                return (
                  <TableCell>
                    <StudentBadge
                      student={map.get(day)?.get(shiftTime.startTime)}
                      hoveredStudent={hoveredStudent}
                      setHoveredStudent={setHoveredStudent}
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
    <div>
      <h2>{props.centerName}</h2>
      {table}
    </div>
  );
};

export default CenterSchedule;
