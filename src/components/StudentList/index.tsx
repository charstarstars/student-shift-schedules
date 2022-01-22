import { Stack } from "@mui/material"
import { StudentSelectionContext } from "common/contexts/StudentSelectionContext"
import { Student } from "common/interfaces"
import StudentBadge from "components/StudentBadge"
import { deskReceptionists } from "deskReceptionists"

interface StudentListProps {
}

export const StudentList: React.FC<StudentListProps> = () => {
    return <Stack direction="row" spacing={1}>
        {
            deskReceptionists.map(student => {
                return <StudentBadge
                    key={student.psuId}
                    student={student}
                />
            })
        }
    </Stack>
}