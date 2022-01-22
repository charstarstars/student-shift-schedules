import { Chip, ChipProps } from "@mui/material";
import { Student } from "common/interfaces";

interface StudentBadgeProps {
  student?: Student;
  hoveredStudent?: Student;
  setHoveredStudent: React.Dispatch<Student | undefined>;
  selectedStudent?: Student;
  setSelectedStudent: React.Dispatch<Student | undefined>;
}
export const StudentBadge: React.FC<StudentBadgeProps> = ({
  student,
  hoveredStudent,
  setHoveredStudent,
  selectedStudent,
  setSelectedStudent
}) => {
  if (!student) {
    return null;
  }
  const isHovered = hoveredStudent === student;
  const isSelected = selectedStudent === student;

  let variant: ChipProps["variant"];

  if (isSelected) {
    variant = "filled";
  } else if (isHovered) {
    variant = "outlined";
  } else {
    variant = "filled";
  }

  return (
    <div
      onClick={() => {
        if (student === selectedStudent) {
          setSelectedStudent(undefined);
        } else {
          setSelectedStudent(student);
        }
      }}
      onMouseOver={() => {
        setHoveredStudent(student);
      }}

      onMouseOut={() => {
        setHoveredStudent(undefined);
      }}
    >
      <Chip
        label={student.firstName}
        // component="a"
        // href={`/receptionists/${student.psuId}`}
        variant={variant}
        color={(isHovered || isSelected) ? "info" : "default"}
      ></Chip>
    </div>
  );
};

export default StudentBadge;
