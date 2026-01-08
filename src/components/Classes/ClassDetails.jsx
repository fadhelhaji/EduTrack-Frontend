import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import * as classService from "../../services/classService";



function ClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState([])
  const [availableStudents, setAvailableStudents] = useState([])
  const [classStudents, setClassStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
  })

  async function refreshClass() {
  try {
    const data = await classService.show(id)
    setCls(data.class)
    setAssignment(data.assignment)
    setAvailableStudents(data.availableStudents)
    setClassStudents(data.classStudents)
  } catch (err) {
    console.log(err)
  } finally {
    setLoading(false)
  }
}
console.log("Class Students:", classStudents);



useEffect(() => {
  refreshClass()
}, [id])

  async function handleAddStudent() {
  await classService.addStudent(id, selectedStudent)
  setSelectedStudent('')
  refreshClass()
}

async function handleRemoveStudent(studentId) {
  await classService.removeStudent(id, studentId)
  refreshClass()
}



  const handleDelete = async () => {
    try {
      await classService.remove(cls._id);
      navigate("/class");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!cls) return <p>Class not found</p>;

  return (
    <div>
      <h1>{cls.className}</h1>
      <p>Program: {cls.program}</p>
      <p>Schedule: {cls.schedule}</p>
      <p>Instructor: {cls.instructor?.username || "N/A"}</p>

      <h3>Assignment</h3>
      {assignment && assignment.length > 0 ? (
        <ul>
          {cls && assignment.map((a) => (
            <li key={a._id}>
              <Link to={`/class/${cls._id}/assignment/${a._id}`}>{a.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No assignments yet</p>
      )}
      <Link to={`/class/${cls._id}/assignment/new`}>
        <button>Create Assignment</button>
      </Link>




      <h3>Students:</h3>
      <select
        value={selectedStudent}
        onChange={(e) => setSelectedStudent(e.target.value)}
      >
        <option value="">Select student to add</option>

        {availableStudents.map(student => (
          <option key={student._id} value={student._id}>
            {student.username}
          </option>
        ))}
      </select>
      <button
        disabled={!selectedStudent}
        onClick={handleAddStudent}
      >
        Add Student
      </button>
          {classStudents.length > 0 ? (
      classStudents.map(student => (
        <div key={student._id}>
          <span>{student.username}</span>
          <button onClick={() => handleRemoveStudent(student._id)}>
            Remove
          </button>
        </div>
      ))
    ) : (
      <p>No students enrolled yet</p>
    )}
      <Link to={`/class/${cls._id}/edit`}>
        <button>Edit Class</button>
      </Link>
      <button onClick={handleDelete}>Delete Class</button>
    </div>
  );
}

export default ClassDetails;
