import { Box, Button, Accordion, AccordionSummary, Typography, AccordionDetails, Grid, Fab, FormGroup, Input, TextField } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';

import { StudentsContext } from "common/contexts/StudentsContext";
import { StudentAvailability, StudentAvailabilityStateless } from "components/StudentAvailability";
import { StudentList } from "components/StudentList";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StartEndTime, Student } from "common/interfaces";
import { allDaysOfWeek, shiftTimes } from "common/config";

export const ReceptionistsPage: React.FC<{}> = () => {
  return (<Box paddingY={8}>
    <Box>
      <Button component={Link} to="/" >
        Back to Schedule
      </Button>
    </Box>
    <Typography variant="h2" marginBottom={2}>Front Desk Receptionists</Typography>
    <Receptionists />
    <Fab variant="extended" color="primary" aria-label="add" sx={{
      position: "absolute",
      right: 16,
      bottom: 16,
    }} component={Link} to="/receptionists/add">
      <AddIcon sx={{ mr: 1 }} />
      Add Receptionist
    </Fab>
  </Box>)
}

function initializeShiftDayTimeArray<T>() {
  return allDaysOfWeek.map(() => Array<T>());
}

export const AddReceptionistsPage: React.FC<{}> = () => {
  const { students, setStudents, studentsAvailabilities, setStudentsAvailabilities } = useContext(StudentsContext)
  const [selectedShifts, setSelectedShifts] = useState<StartEndTime[][]>(initializeShiftDayTimeArray<StartEndTime>());
  const navigate = useNavigate();

  const [student, setStudent] = useState<Student>({
    firstName: "",
    lastName: "",
    psuId: 0,
    maxShiftsPerWeek: 0,
  })

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("")
  const [psuId, setPsuId] = useState<number>()
  const [maxShiftsPerWeek, setMaxShiftsPerWeek] = useState<number>()

  const handleSubmit = () => {
    if (!psuId || !maxShiftsPerWeek) {
      // error
      return;
    }
    const newStudent: Student = {
      firstName,
      lastName,
      psuId,
      maxShiftsPerWeek,
    }

    setStudents([...students, newStudent])
    setStudentsAvailabilities([
      ...studentsAvailabilities,
      {
        student: newStudent,
        shiftPreferences: selectedShifts
      }
    ])
    // navigate to list of receptionists
    navigate('/receptionists')
  }
  return <Box paddingY={4}>
    <Box marginY={4}>
      <Typography variant="h2">
        New Receptionist
      </Typography></Box>
    <Grid component="form" spacing={2}>
      <TextField
        label="First Name"
        required
        value={firstName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFirstName(e.target.value)
        }} />
      <TextField
        label="Last Name"
        required
        value={lastName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setLastName(e.target.value)
        }} />
      <TextField
        label="PSU ID"
        required
        value={psuId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPsuId(Number(e.target.value))
        }} />
      <TextField
        label="Max shifts per week"
        required
        value={maxShiftsPerWeek}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setMaxShiftsPerWeek(Number(e.target.value))
        }} />
    </Grid>
    <StudentAvailabilityStateless selectedShifts={selectedShifts} setSelectedShifts={setSelectedShifts} />
    <Button variant="contained" size="large" onClick={handleSubmit}>Save Receptionist</Button>
  </Box>
}
export const Receptionists: React.FC<{}> = () => {
  const { studentsAvailabilities } = useContext(StudentsContext)
  return <Box>
    {studentsAvailabilities.map(({ shiftPreferences, student }) => {
      return (
        <Accordion key={student.psuId} >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              {student.firstName} {student.lastName}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={2} >
                <Typography fontWeight={500} >
                  PSU ID
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>
                  {student.psuId}
                </Typography>
              </Grid>
            </Grid >
            <Grid container spacing={2}>
              <Grid item xs={2} >
                <Typography fontWeight={500}>
                  Max shifts per week
                </Typography>
              </Grid>
              <Grid item xs={2} >
                <Typography>
                  {student.maxShiftsPerWeek}
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
          <StudentAvailability student={student}>

          </StudentAvailability>
        </Accordion>
      )
    })}

  </Box >;
};
