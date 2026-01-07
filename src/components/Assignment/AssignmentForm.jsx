
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as assignmentService from '../../services/assignmentService';
import * as classService from '../../services/classService';

function AssignmentForm() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assignment, setAssignment] = useState({
        title: '',
        description: '',
        deadline: '',
        totalGrade: '',
        // class: ''
    })

    async function handleSubmit(e){
        e.preventDefault()
        try {
           if (id){
            await assignmentService.update(id, assignment);
            navigate(`/assignment/${id}`);
            } else {
              await assignmentService.create(assignment);
              navigate('/assignment')
           }
        } catch (error) {
            console.log(error)
        }
    }

      // useEffect(() => {
      //   async function fetchClasses() {
      //     try {
      //       const data = await classService.index();
      //       setClasses(data);
      //       console.log(data)
      //     } catch (error) {
      //       console.log(error);
      //     } finally {
      //       setLoading(false);
      //     }
      //   }
    
      //   fetchClasses();
      // }, []);
    useEffect(() => {
        async function fetchData() {
            try {
                const classData = await classService.index();
                setClasses(classData);
                if (id) {
                    const existingData = await assignmentService.show(id);
                    if (existingData.deadline) {
                        existingData.deadline = new Date(existingData.deadline).toISOString().split('T')[0];
                    }
                    setAssignment(existingData);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    function handleChange(e){
        setAssignment({...assignment, [e.target.name] : e.target.value})
        console.log(assignment)
    }
    
    if (loading) return <p>Loading...</p>;

  return (

<div>
            <h1>{id ? "Edit Assignment" : "Create Assignment"}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input value={assignment.title} onChange={handleChange} name='title' id='title' type="text" />

                <label htmlFor="description">Description</label>
                <input value={assignment.description} onChange={handleChange} name='description' id='description' type="text" />

                <label htmlFor="deadline">Deadline</label>
                <input value={assignment.deadline} onChange={handleChange} name='deadline' id='deadline' type="date" />

                <label htmlFor="totalGrade">Total Grade</label>
                <input value={assignment.totalGrade} onChange={handleChange} name='totalGrade' id='totalGrade' type="number" />

                <label htmlFor="class">Class</label>
                <select name="class" id='class' value={assignment.class} onChange={handleChange}>
                    <option value="">Select a Class</option>
                    {classes.map((one) => (
                        <option value={one._id} key={one._id}>{one.className}</option>
                    ))}
                </select>
                <button type="submit">
                    {id ? "Update Assignment" : "Create Assignment"}
                </button>
            </form>
        </div>
  )
}

export default AssignmentForm