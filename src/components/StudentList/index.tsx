import { Stack } from "@mui/material"
import { Student } from "common/interfaces"
import StudentBadge from "components/StudentBadge"
import { deskReceptionists } from "deskReceptionists"

interface StudentListProps {
    hoveredStudent?: Student;
    setHoveredStudent: React.Dispatch<Student | undefined>;
    selectedStudent?: Student;
    setSelectedStudent: React.Dispatch<Student | undefined>;
}

export const StudentList: React.FC<StudentListProps> = ({ hoveredStudent, setHoveredStudent, selectedStudent, setSelectedStudent }) => {
    return <Stack direction="row" spacing={1}>
        {
            deskReceptionists.map(student => {
                return <StudentBadge
                    key={student.psuId}
                    student={student}
                    setHoveredStudent={setHoveredStudent}
                    hoveredStudent={hoveredStudent}
                    selectedStudent={selectedStudent}
                    setSelectedStudent={setSelectedStudent}
                />
            })
        }
    </Stack>
}