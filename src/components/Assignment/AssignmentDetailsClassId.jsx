import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as classService from "../../services/classService";

function AssignmentDetailsClassId() {
  const { classId, assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssignment() {
      try {
        const data = await classService.getAssignmentForClass(classId, assignmentId);
        setAssignment(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchAssignment();
  }, [classId, assignmentId]);

  if (loading) return <p>Loading...</p>;
  if (!assignment) return <p>Assignment not found</p>;

  return (
    <div>
      <h1>{assignment.title}</h1>
      <p>{assignment.description}</p>
      <p>Deadline: {assignment.deadline}</p>
      <p>Total Grade: {assignment.totalGrade}</p>
    </div>
  );
}

export default AssignmentDetailsClassId;
