
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        class: ''
    })

    async function handleSubmit(e) {
        e.preventDefault();

        const finalClassId = classId || assignment.class;

        if (!finalClassId) {
            toast.error("Please select a class");
            return;
        }

        try {
            if (assignmentId) {
                await assignmentService.update(assignmentId, assignment);
                toast.success("Assignment updated successfully!");
            } else {
                await classService.createAssignment(finalClassId, assignment);
                toast.success("Assignment created successfully!");
                navigate(`/class/${finalClassId}`);
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    }



    useEffect(() => {
        async function fetchData() {
            try {
                const classData = await classService.index();
                setClasses(classData);

                if (assignmentId) {
                    const existing = await assignmentService.show(assignmentId);

                    if (existing.deadline) {
                        existing.deadline = new Date(existing.deadline)
                            .toISOString()
                            .split("T")[0];
                    }

                    setAssignment(existing);
                }
                else if (classId) {
                    setAssignment(prev => ({
                        ...prev,
                        class: classId
                    }));
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


                <label htmlFor="class">Class</label>
                <select
                    name="class"
                    id="class"
                    value={assignment.class}
                    onChange={handleChange}
                    disabled={!!classId}
                >
                    <option value="">Select a Class</option>
                    {classes.map((one) => (
                        <option value={one._id} key={one._id}>{one.className}</option>
                    ))}
                </select>
                <div>
                    <button type="submit">
                        {assignmentId ? "Update Assignment" : "Create Assignment"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AssignmentForm