import { useState } from "react";
import { Button } from "@mui/material";
import { CenterSchedule } from "./CenterSchedule";
import { createSchedule } from "./deskReceptionists";
import { centers } from "./shifts";
import { Student } from "interfaces";
import "./styles.css";

export default function App() {
  const schedule = createSchedule();

  const [hoveredStudent, setHoveredStudent] = useState<Student>();
  return (
    <div className="App">
      <h1>CRC Shift Scheduling</h1>
      {centers.map((center) => {
        return (
          <CenterSchedule
            shifts={schedule}
            centerName={center}
            hoveredStudent={hoveredStudent}
            setHoveredStudent={setHoveredStudent}
          />
        );
      })}
      <Button color="primary" variant="contained" href="/receptionists">
        Edit Receptionists
      </Button>
    </div>
  );
}
