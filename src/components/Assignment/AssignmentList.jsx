import { useEffect, useState } from 'react';
import * as assignmentService from '../../services/assignmentService' 
import { Link } from 'react-router';


function AssignmentList(){
const [assignment, setAssignment] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(()=>{
    async function fetchAssignment(){
        try {
            const data = await assignmentService.index();
            setAssignment(data);
        } catch (error) {
            console.log(error);
        }
        finally {
        setLoading(false);
      }
    }
    fetchAssignment();
},[])

  if (loading) return <p>Loading...</p>;

return (
    <div>
      <h1>Assignment</h1>

      {assignment.length === 0 ? (
        <p>No classes found</p>
      ) : (
        assignment.map((oneAssignment) => (
          <div key={oneAssignment._id}>
            <h3><Link to={`/assignment/${oneAssignment._id}`}>{oneAssignment.title}</Link></h3>
          </div>
        ))
      )}
    </div>
  );

}

export default AssignmentList;