import { useEffect, useState } from 'react';
import * as assignmentService from '../../services/assignmentService' 
import { Link } from 'react-router';


function AssignmentList(){
const [assignments, setAssignments] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(()=>{
    async function fetchAssignments(){
        try {
            const data = await assignmentService.index();
            setAssignments(data || []);
        } catch (error) {
            console.log("Error fetching assignments:", error);
        }
        finally {
        setLoading(false);
      }
    }
    fetchAssignments();
},[])

  if (loading) return <p>Loading...</p>;

return (
    <div>
      <h1>All Assignment</h1>

      {assignments.length === 0 ? (
        <p>No Assignments found</p>
      ) : (
        assignments.map((assignment) => (
          <div key={assignment._id}>
            <h3>
            <Link to={`/assignment/${assignment._id}`}>
            {assignment.title}
            </Link>
            </h3>
            <p>Class: {assignment.class?.className || "N/A"}</p>
          </div>
        ))
      )}
    </div>
  );

}

export default AssignmentList;