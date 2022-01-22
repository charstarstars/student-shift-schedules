import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Switch, Button, Box } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import { allDaysOfWeek, daysOfOperation, shiftTimes } from "common/config";
import { ShiftDayTime, Student, StartEndTime, DayOfWeek } from "common/interfaces";
import { getDayOfWeekString, ShiftTime } from "common/utils";
import { deskReceptionists } from "deskReceptionists";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

interface StudentAvailabilityProps {
    student: Student;
}

function initializeShiftDayTimeArray<T>() {
    return allDaysOfWeek.map(() => Array(shiftTimes.length));
}

export const StudentAvailabilityPage: React.FC<{}> = () => {
    let { studentId } = useParams();
    const student = deskReceptionists.find((s) => {
        return studentId === "" + s.psuId
    })
    if (!student) {
        // Didn't find student with this id
        return <></>;
    }
    return <StudentAvailability student={student} />
}

export const StudentAvailability: React.FC<StudentAvailabilityProps> = ({ student }) => {
    const [selectedShifts, setSelectedShifts] = useState<StartEndTime[][]>(initializeShiftDayTimeArray<StartEndTime>());

    const onCheckboxClick = (day: DayOfWeek, shiftTime: StartEndTime) => () => {
        const locatedShiftTimeIndex = selectedShifts[day].indexOf(shiftTime)
        const isSelected = locatedShiftTimeIndex >= 0;
        const nextSelectedShifts = [...selectedShifts];
        if (isSelected) {
            nextSelectedShifts[day] = [
                ...selectedShifts[day].slice(0, locatedShiftTimeIndex),
                ...selectedShifts[day].slice(locatedShiftTimeIndex + 1)
            ];
        } else {
            nextSelectedShifts[day].push(shiftTime);
        }
        setSelectedShifts(nextSelectedShifts);
    }

    const hoursOfOperationTable = <Table>
        <TableHead>
            <TableRow>
                <TableCell>
                </TableCell>
                {daysOfOperation.map((day) => {
                    return <TableCell key={day}>{getDayOfWeekString(day)}</TableCell>;
                })}
            </TableRow>
        </TableHead>
        <TableBody>
            {shiftTimes.map((shiftTime) => {
                const { startTime, endTime } = shiftTime;
                return (
                    <TableRow key={`${startTime}-${endTime}`}>
                        <TableCell>
                            <ShiftTime startTime={startTime} endTime={endTime} />
                        </TableCell>
                        {daysOfOperation.map((day) => {
                            return (
                                <TableCell key={day}>
                                    <Checkbox checked={selectedShifts[day].includes(shiftTime)}
                                        onClick={onCheckboxClick(day, shiftTime)} />
                                </TableCell>
                            );
                        })}
                    </TableRow>
                );
            })}
        </TableBody>
    </Table>
    return <div>
        <h1>Student Schedule {student.firstName}</h1>
        <Box sx={{
            marginY: 10,
        }}>
            {hoursOfOperationTable}
        </Box>
    </div>
}