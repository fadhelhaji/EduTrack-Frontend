
import { useState } from 'react'
import * as assignmentService from '../../services/assignmentService'

function AssignmentForm() {
    const [assignment, setAssignment] = useState({
        title: '',
        description: '',
        deadline: '',
        totalGrade: '',
    })

    async function handleSubmit(e){
        e.preventDefault()
        try {
            const data = await assignmentService.create(assignment)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    function handleChange(e){
        setAssignment({...assignment, [e.target.name] : e.target.value})
    }

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
            <button type="submit">Create Assignment</button>
        </form>
    </div>
  )
}

export default AssignmentForm