
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as assignmentService from '../../services/assignmentService';
import * as classService from '../../services/classService';

function AssignmentForm() {
    const navigate = useNavigate()
    // const {id} = useParams()
    // console.log(id)
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
            await assignmentService.create(assignment)
            navigate('/class')
        } catch (error) {
            console.log(error)
        }
    }

      useEffect(() => {
        async function fetchClasses() {
          try {
            const data = await classService.index();
            setClasses(data);
            console.log(data)
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }
    
        fetchClasses();
      }, []);

    function handleChange(e){
        setAssignment({...assignment, [e.target.name] : e.target.value})
        console.log(assignment)
    }
    
    if (loading) return <p>Loading...</p>;

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">title</label>
            <input value={assignment.title} onChange={handleChange} name='title' id='title' type="text" />

            <label htmlFor="description">description</label>
            <input value={assignment.description} onChange={handleChange} name='description' id='description' type="text" />

            <label htmlFor="deadline">deadline</label>
            <input value={assignment.deadline} onChange={handleChange} name='deadline' id='deadline' type="date" />

            <label htmlFor="totalGrade">totalGrade</label>
            <input value={assignment.totalGrade} onChange={handleChange} name='totalGrade' id='totalGrade' type="number" />

            <select name="class" id='class' onChange={handleChange}>
                {classes.map((one)=>{
                    return (
                        <option value={one._id} key={one._id}>{one.className}</option>
                    )
                })}
            </select>
            <button type="submit">Create Assignment</button>
        </form>
    </div>
  )
}

export default AssignmentForm