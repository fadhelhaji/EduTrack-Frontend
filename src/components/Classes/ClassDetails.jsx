import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import * as classService from "../../services/classService";

function ClassDetails() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [cls, setCls] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClass() {
      try {
        const data = await classService.show(id);
        setCls(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchClass();
  }, [id]);

    async function handleDelete() {
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
      {/* <p>Instructor: {cls.instructor?.username || "N/A"}</p>
      <p>Student: {cls.student?.username || "N/A"}</p> */}

      <Link to={`/class/${cls._id}/edit`}><button>Edit Class</button></Link>
      <button onClick={handleDelete}>Delete Class</button>
    </div>
  );
}

export default ClassDetails;
