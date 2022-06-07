import { StudentsContextProps } from "common/interfaces";
import React from "react";


export const StudentsContext = React.createContext<StudentsContextProps>({
    students: [],
    setStudents: () => { },
    studentsAvailabilities: [],
    setStudentsAvailabilities: () => { }
})