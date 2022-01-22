import { useEffect, useState, useRef, useContext } from "react";
import React from "react";
import { Button, Container, Identity } from "@mui/material";

import { CenterSchedule } from "components/CenterSchedule";
import { createSchedule } from "deskReceptionists";
import { Shift, Student, StudentSelectionContextProps } from "common/interfaces";
import { centers } from "common/config";
import { StudentList } from "components/StudentList";
import { ThemeContext } from "@emotion/react";
import { StudentSelectionContext } from "common/contexts/StudentSelectionContext";



export default function ShiftScheduleView() {
    const schedule = useRef(createSchedule());

    const [hoveredStudent, setHoveredStudent] = useState<Student>();
    const [selectedStudent, setSelectedStudent] = useState<Student>();

    return (
        <StudentSelectionContext.Provider value={{
            hoveredStudent,
            setHoveredStudent,
            selectedStudent,
            setSelectedStudent,
        }}>
            <h1>CRC Shift Scheduling</h1>
            <StudentList />
            {centers.map((center) => {
                return (
                    <CenterSchedule
                        key={center}
                        shiftSchedule={schedule.current}
                        centerName={center}
                    />
                );
            })}
            <Button color="primary" variant="contained" href="/receptionists">
                Edit Receptionists
            </Button>
        </StudentSelectionContext.Provider>
    );
}
