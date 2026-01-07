import { useEffect, useState } from 'react';
import {useNavigate, useParams, Link } from 'react-router';
import * as assignmentService from '../../services/assignmentService';


function AssignmentDetails() {
  const { id } = useParams();
   const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  // const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    async function fetchDetails(){
        try {
          const data = await assignmentService.show(id);
          setAssignment(data);
          // const assignmentData = await assignmentService.show(id);
          // setAssignment(assignmentData);

          // const submissionData = await assignmentService.getSubmission(id);
          // setSubmissions(submissionData || []);
          } catch (error) {
            console.log("Error loading assignment details:", error);
          } finally {
          setLoading(false);
      }
    } fetchDetails();
  },[id]);

  const handleDelete = async () => {
    try {
      await assignmentService.remove(assignment._id);
      navigate("/assignment");
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
      <p>Deadline:{assignment.deadline ? new Date(assignment.deadline).toLocaleDateString() : "No deadline"}</p>
      <p>Total Grade: {assignment.totalGrade}</p>

      <hr/>
{/* 
    <h2>Student Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <ul>
          {submissions.map((sub) => (
            <li key={sub._id}>
              <p><strong>Student:</strong> {sub.student?.username}</p>
              <p><strong>Link:</strong> <a href={sub.githubUrl} >View Github Repo</a></p>
              <p><strong>Grade:</strong> {sub.grade}</p>
              <p><strong>Notes:</strong> {sub.notes || "No notes provided"}</p>
    </li>
          ))}
        </ul>
      )} */}
      <Link to={`/assignment/${assignment._id}/edit`}>
        <button>Edit Assignment</button>
      </Link>
      <button onClick={handleDelete}>Delete Assignment</button>

    </div>
  )
}

export default AssignmentDetails