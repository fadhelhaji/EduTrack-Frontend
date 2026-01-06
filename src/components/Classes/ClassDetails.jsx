import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import * as classService from "../../services/classService";



function ClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState([])
  // useEffect(()=>{
  //   async function fetchStudents() {
  //     try {
  //       const data = await studentService.index()
  //       console.log(data)
  //       setStudent(data.student)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchStudents()
  // }, []);

  useEffect(() => {
    async function fetchClass() {
      try {
        const data = await classService.show(id);
        setCls(data.class);
        console.log(data.class)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchClass();
  }, [id]);

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
      {cls.assignment && cls.assignment.length > 0 ? (
      <ul>
        {cls.assignment.map((a) => (
          <li key={a._id}>
            <h4>{a.title}</h4>
            <p>{a.description}</p>
            <p>
              Deadline: { (a.deadline)}
            </p>
            <p>Total Grade: {a.totalGrade}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p>No assignments yet</p>
    )}



      <h3>Students:</h3>
      {/* {cls.students && cls.students.length > 0 ? (
        cls.students.map((student) => (
          <p key={student._id}>{student.username}</p>
        ))
      ) : (
        <p>No students enrolled yet</p>
      )} */}

      <Link to={`/class/${cls._id}/edit`}>
        <button>Edit Class</button>
      </Link>
      <button onClick={handleDelete}>Delete Class</button>
    </div>
  );
}

export default ClassDetails;
