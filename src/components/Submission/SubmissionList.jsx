import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { getSubmissions, deleteSubmission } from "../../services/submissionService";

function SubmissionList() {
  const { user } = useContext(UserContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        let data = await getSubmissions();

        if (user?.role === "Student") {
          data = data.filter((s) => s.student?._id === user._id);
        }

        setSubmissions(data || []);
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setError("Failed to load submissions.");
      } finally {
        setLoading(false);
      }
    }

    if (user) fetchSubmissions();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) return;

    try {
      await deleteSubmission(id);
      setSubmissions(submissions.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Failed to delete submission:", err);
      alert("Failed to delete submission.");
    }
  };

  if (loading) return <p>Loading submissions...</p>;

  return (
    <div>
      <h1>{user?.role === "Student" ? "My Submissions" : "All Submissions"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {submissions.length === 0 && user?.role === "Student" && (
        <>
          <p>You have not submitted any assignments yet.</p>
          <Link to="/submissions/new">
            <button>Submit Assignment</button>
          </Link>
        </>
      )}

      {submissions.map((s) => (
        <div
          key={s._id}
         
        >
          <p>
            <strong>Assignment:</strong> {s.assignment?.title}
          </p>
          <p>
            <strong>Student:</strong> {s.student?.username || s.student?._id}
          </p>
          <p>
            <strong>Grade:</strong> {s.grade}
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a href={s.githubUrl} target="_blank" rel="noreferrer">
              {s.githubUrl}
            </a>
          </p>

          <Link to={`/submission/${s._id}`} style={{ marginRight: "10px" }}>
            Details
          </Link>

          {user?.role === "Student" && (
            <button onClick={() => handleDelete(s._id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default SubmissionList;
