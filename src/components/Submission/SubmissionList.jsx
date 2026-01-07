import { useEffect, useState } from "react";
import { getSubmissions, deleteSubmission } from "../../services/submissionService";
import { Link } from "react-router";

const SubmissionList = ({ user }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubmissions = async () => {
    try {
      const data = await getSubmissions();

      let filtered = data;
      if (user?.role === "Student") {
        filtered = data.filter((onestudent) => onestudent.student?._id === user._id);
      }

      setSubmissions(filtered);
    } catch (err) {
      console.error(err);
      setError("Failed to load submissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) return;

    try {
      await deleteSubmission(id);
      setSubmissions(submissions.filter((onestudent) => onestudent._id !== id));
    } catch (err) {
      alert("Failed to delete submission.");
    }
  };

  if (loading) return <p>Loading submissions...</p>;

  if (submissions.length === 0) return <p>No submissions found.</p>;

  return (
    <div>
      <h2>Submissions</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {submissions.map((onestudent) => (
        <div
          key={onestudent._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <p>
            <strong>Assignment:</strong> {onestudent.assignment?.title}
          </p>
          <p>
            <strong>Student:</strong> {onestudent.student?.name || onestudent.student?._id}
          </p>
          <p>
            <strong>Grade:</strong> {onestudent.grade}
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a href={onestudent.githubUrl} target="_blank">
              {s.githubUrl}
            </a>
          </p>

          <Link to={`/submission/${onestudent._id}`} style={{ marginRight: "10px" }}>
            Details
          </Link>

          {user?.role === "Instructor" && (
            <button onClick={() => handleDelete(s._id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubmissionList;
