
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

import "./styles.css";
import { useState } from "react";
import { Student, StudentShiftPreference } from "common/interfaces";
import { StudentsContext } from "common/contexts/StudentsContext";
import { deskReceptionists, studentShiftPreferences } from "data/students";

export default function App() {

  const [students, setStudents] = useState<Student[]>(deskReceptionists);
  const [studentsAvailabilities, setStudentsAvailabilities] = useState<StudentShiftPreference[]>(studentShiftPreferences)

  return (
    <Container className="App">
      <StudentsContext.Provider value={{
        students,
        setStudents,
        studentsAvailabilities,
        setStudentsAvailabilities
      }}>
        <Outlet />
      </StudentsContext.Provider>

    </Container >
  );
}
