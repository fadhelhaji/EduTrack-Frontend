
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as assignmentService from '../../services/assignmentService';
import * as classService from '../../services/classService';

function AssignmentForm() {
    const navigate = useNavigate()
    const { id, assignmentId } = useParams();
    const classId = id;
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assignment, setAssignment] = useState({
        title: '',
        description: '',
        deadline: '',
        totalGrade: '',
        class: ''
    })

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (assignmentId) {
                await assignmentService.update(assignmentId, assignment);
            } else {
                await classService.createAssignment(classId, assignment);
                navigate(`/class/${classId}`);
            }
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const classData = await classService.index();
                setClasses(classData);

                if (assignmentId) {
                    const existing = await assignmentService.show(assignmentId);
                    if (!assignmentId && classId) {
                        setAssignment(prev => ({
                            ...prev,
                            class: classId
                        }));
                        }
                    if (existing.deadline) {
                        existing.deadline = new Date(existing.deadline)
                            .toISOString()
                            .split("T")[0];
                    }

                    setAssignment(existing);
                } else {
                    setAssignment(prev => ({ ...prev, class: classId }));
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [assignmentId, classId]);


    function handleChange(e) {
        setAssignment({ ...assignment, [e.target.name]: e.target.value })
        console.log(assignment)
    }

    if (loading) return <p>Loading...</p>;

    return (

        <div>
            <h1>{assignmentId ? "Edit Assignment" : "Create Assignment"}</h1>
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
                    {assignmentId ? "Update Assignment" : "Create Assignment"}
                </button>
            </form>
        </div>
    )
}

export default AssignmentForm