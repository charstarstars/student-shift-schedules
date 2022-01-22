import { StudentSelectionContextProps } from "common/interfaces";
import React from "react";


export const StudentSelectionContext = React.createContext<StudentSelectionContextProps>({
    hoveredStudent: undefined,
    setHoveredStudent: () => { },
    selectedStudent: undefined,
    setSelectedStudent: () => { },
})