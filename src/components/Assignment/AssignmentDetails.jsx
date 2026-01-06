import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import * as assignmentService from '../../services/assignmentService';


function AssignmentDetails() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    async function fetchDetails(){
        try {
        const assignmentData = await assignmentService.show(id);
        setAssignment(assignmentData);

        const submissionData = await assignmentService.getSubmission(id);
        setSubmissions(submissionData || []);
        } catch (error) {
            console.log("Error loading assignment details:", error);
        } finally {
        setLoading(false);
      }
    } fetchDetails();
  },[id]);

  if (loading) return <p>Loading...</p>;
  if (!assignment) return <p>Assignment not found</p>;

  
  return (
    <div>
       <h1>{assignment.title}</h1>
      <p>Description: {assignment.description}</p>
      <p>Deadline: {new Date(assignment.deadline).toLocaleDateString()}</p>
      <p>Total Grade: {assignment.totalGrade}</p>

      <hr/>

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
      )}
    </div>
  )
}

export default AssignmentDetails