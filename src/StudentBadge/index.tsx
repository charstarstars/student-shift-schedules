import { Chip } from "@mui/material";
import { Student } from "interfaces";

interface StudentBadgeProps {
  student?: Student;
  hoveredStudent?: Student;
  setHoveredStudent: React.Dispatch<Student>;
}
export const StudentBadge: React.FC<StudentBadgeProps> = ({
  student,
  hoveredStudent,
  setHoveredStudent
}) => {
  if (!student) {
    return null;
  }
  const isHovered = hoveredStudent === student;
  return (
    <div
      onMouseOver={() => {
        setHoveredStudent(student);
      }}
      // onMouseOut={() => {
      //   setHoveredStudent(undefined);
      // }}
    >
      <Chip
        label={student.firstName}
        component="a"
        href={`/receptionists/${student.psuId}`}
        color={isHovered ? "info" : "default"}
      ></Chip>
    </div>
  );
};

export default StudentBadge;
