import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import * as assignmentService from '../../services/assignmentService';

function AssignmentDetails() {
  const { classId, assignmentId } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await assignmentService.getAssignmentForClass(classId, assignmentId);
        setAssignment(data);
      } catch (error) {
        console.log("Error loading assignment details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [classId, assignmentId]);

  const handleDelete = async () => {
    try {
      await assignmentService.remove(assignment._id);
      navigate(`/class/${classId}/assignments`);
    } catch (error) {
      console.log("Error deleting assignment:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!assignment) return <p>Assignment not found</p>;

  return (
    <div>
      <h1>{assignment.title}</h1>
      <p>Description: {assignment.description}</p>
      <p>Deadline: {assignment.deadline ? new Date(assignment.deadline).toLocaleDateString() : "No deadline"}</p>
      <p>Total Grade: {assignment.totalGrade}</p>

      <Link to={`/class/${classId}/assignment/${assignment._id}/edit`}>
        <button>Edit Assignment</button>
      </Link>
      <button onClick={handleDelete}>Delete Assignment</button>
    </div>
  );
}

export default AssignmentDetails;
