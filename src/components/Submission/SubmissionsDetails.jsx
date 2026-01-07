import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const SubmissionDetails = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    fetchSubmission();
  }, []);

  const fetchSubmission = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/submission/${id}`
    );
    setSubmission(res.data.submission);
  };

  if (!submission) return <p>Loading...</p>;

  return (
    <div>
      <h2>Submission Details</h2>

      <p><strong>Assignment:</strong> {submission.assignment?.title}</p>
      <p><strong>Student:</strong> {submission.student?.name}</p>
      <p>
        <strong>GitHub:</strong>{" "}
        <a href={submission.githubUrl} target="_blank">
          {submission.githubUrl}
        </a>
      </p>
      <p><strong>Notes:</strong> {submission.notes}</p>
      <p><strong>Grade:</strong> {submission.grade}</p>
    </div>
  );
};

export default SubmissionDetails;
