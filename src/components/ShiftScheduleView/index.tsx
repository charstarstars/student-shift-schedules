import { useEffect, useState, useRef, useContext } from "react";
import React from "react";
import { Box, Button, Container, Identity, Typography } from "@mui/material";

import { CenterSchedule } from "components/CenterSchedule";
import { createSchedule } from "deskReceptionists";
import { Shift, Student, StudentSelectionContextProps } from "common/interfaces";
import { centers } from "common/config";
import { StudentList } from "components/StudentList";
import { ThemeContext } from "@emotion/react";
import { StudentSelectionContext } from "common/contexts/StudentSelectionContext";
import { StudentsContext } from "common/contexts/StudentsContext";
import { Link } from "react-router-dom";



export default function ShiftScheduleView() {
    const { students, studentsAvailabilities } = useContext(StudentsContext);
    const schedule = useRef(createSchedule(students, studentsAvailabilities));

    const [hoveredStudent, setHoveredStudent] = useState<Student>();
    const [selectedStudent, setSelectedStudent] = useState<Student>();

    return (
        <StudentSelectionContext.Provider value={{
            hoveredStudent,
            setHoveredStudent,
            selectedStudent,
            setSelectedStudent,
        }}>
            <Box paddingY={8}>
                <Typography variant="h2">CRC Shift Scheduling</Typography>
                <Box marginY={2}>
                    <StudentList />
                </Box>
                {centers.map((center) => {
                    return (
                        <CenterSchedule
                            key={center}
                            shiftSchedule={schedule.current}
                            centerName={center}
                        />
                    );
                })}
                <Button component={Link} to="/receptionists" color="primary" variant="contained">
                    Edit Receptionists
                </Button>
            </Box>
        </StudentSelectionContext.Provider>
    );
}
