import { useEffect, useState, useRef } from "react";
import { Button, Container, Identity } from "@mui/material";

import { CenterSchedule } from "components/CenterSchedule";
import { createSchedule } from "./deskReceptionists";
import { Shift, Student } from "common/interfaces";
import { centers } from "common/config";
import "./styles.css";
import { StudentList } from "components/StudentList";

export default function App() {
  const schedule = useRef(createSchedule());

  const [hoveredStudent, setHoveredStudent] = useState<Student>();
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  return (
    <Container className="App">
      <h1>CRC Shift Scheduling</h1>
      <StudentList
        hoveredStudent={hoveredStudent}
        setHoveredStudent={setHoveredStudent}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />
      {centers.map((center) => {
        return (
          <CenterSchedule
            key={center}
            shifts={schedule.current}
            centerName={center}
            hoveredStudent={hoveredStudent}
            setHoveredStudent={setHoveredStudent}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
          />
        );
      })}
      <Button color="primary" variant="contained" href="/receptionists">
        Edit Receptionists
      </Button>
    </Container>
  );
}
