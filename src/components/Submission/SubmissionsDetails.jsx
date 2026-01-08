import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deleteSubmission, show } from "../../services/submissionService";
import { UserContext } from "../Contexts/UserContext";

function SubmissionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubmission() {
      try {
        const data = await show(id);
        setSubmission(data);
      } catch (err) {
        console.error("Error loading submission:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSubmission();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this submission?")) return;

    try {
      await deleteSubmission(submission._id);
      navigate("/submissions");
    } catch (err) {
      console.error("Failed to delete submission:", err);
      alert("Failed to delete submission.");
    }
  };

  if (loading) return <p>Loading submission...</p>;
  if (!submission) return <p>Submission not found</p>;

  return (
    <div>
      <h1>Submission Details</h1>
      <p>
        <strong>Assignment:</strong> {submission.assignment?.title}
      </p>
      <p>
        <strong>Student:</strong> {submission.student?.username || submission.student?._id}
      </p>
      <p>
        <strong>GitHub:</strong>{" "}
        <a href={submission.githubUrl} target="_blank" rel="noreferrer">
          {submission.githubUrl}
        </a>
      </p>

      <p>
        <strong>Notes:</strong> {submission.notes || "No notes provided"}
      </p>

      {user?.role === "Student" && (
        <button onClick={handleDelete}>Delete Submission</button>
      )}

      <Link to="/submissions">
        <button style={{ marginLeft: "10px" }}>Back to Submissions</button>
      </Link>
    </div>
  );
}

export default SubmissionDetails;
