import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { createSubmission } from "../../services/submissionService";

const SubmissionForm = ({ studentId }) => {
  const { id: assignmentId } = useParams();
  const navigate = useNavigate();

  const [githubUrl, setGithubUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (element) => {
    element.preventDefault();
    setError("");

    try {
      await createSubmission({
        githubUrl,
        notes,
        student: studentId,
        assignment: assignmentId,
      });

      navigate("/submissions");
    } catch (err) {
      if (err.response?.status === 500) {
        setError("You already submitted this assignment.");
      } else {
        setError("Failed to submit assignment.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Assignment</h2>

      <input
        type="url"
        placeholder="GitHub Repository URL"
        value={githubUrl}
        onChange={(element) => setGithubUrl(element.target.value)}
        required
      />

      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(element) => setNotes(element.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmissionForm;
