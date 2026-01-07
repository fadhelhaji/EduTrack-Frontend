import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "../Contexts/UserContext";
import {
  getSubmissions,
  deleteSubmission,
} from "../../services/submissionService";

const MySubmissions = () => {
  const { user } = useContext(UserContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMySubmissions();
  }, []);

  const fetchMySubmissions = async () => {
    try {
      const data = await getSubmissions();

      const mySubs = data.filter(
        (s) => s.student?._id === user._id
      );

      setSubmissions(mySubs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this submission?");
    if (!confirm) return;

    await deleteSubmission(id);
    setSubmissions(submissions.filter((s) => s._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Submissions</h2>

      {submissions.length === 0 && (
        <p>You haven’t submitted anything yet.</p>
      )}

      {submissions.map((s) => (
        <div
          key={s._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <strong>Assignment:</strong>{" "}
            {s.assignment?.title}
          </p>

          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(s.assignment?.deadline).toLocaleDateString()}
          </p>

          <p>
            <strong>Grade:</strong> {s.grade}
          </p>

          <p>
            <a href={s.githubUrl} target="_blank">
              GitHub Repo
            </a>
          </p>

          <button onClick={() => handleDelete(s._id)}>
            Delete Submission
          </button>
        </div>
      ))}
    </div>
  );
};

export default MySubmissions;
