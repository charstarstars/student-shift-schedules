import { Stack } from "@mui/material"
import { StudentsContext } from "common/contexts/StudentsContext"
import { StudentSelectionContext } from "common/contexts/StudentSelectionContext"
import { Student } from "common/interfaces"
import StudentBadge from "components/StudentBadge"
import { useContext } from "react"

interface StudentListProps {
}

export const StudentList: React.FC<StudentListProps> = () => {
    const { students } = useContext(StudentsContext);

    return <Stack direction="row" spacing={1}>
        {
            students.map(student => {
                return <StudentBadge
                    key={student.psuId}
                    student={student}
                />
            })
        }
    </Stack>
}