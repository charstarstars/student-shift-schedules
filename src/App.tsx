import { useEffect, useState, useRef, useContext } from "react";
import React from "react";
import { Button, Container, Identity } from "@mui/material";

import { CenterSchedule } from "components/CenterSchedule";
import { createSchedule } from "./deskReceptionists";
import { Shift, Student, StudentSelectionContextProps } from "common/interfaces";
import { centers } from "common/config";
import "./styles.css";
import { StudentList } from "components/StudentList";
import { ThemeContext } from "@emotion/react";
import { StudentSelectionContext } from "common/contexts/StudentSelectionContext";
import { Outlet } from "react-router-dom";



export default function App() {

  return (
    <Container className="App">
      <Outlet />
    </Container>
  );
}
