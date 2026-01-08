import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { create } from "../../services/submissionService";
import { UserContext } from "../Contexts/UserContext";
import * as assignmentService from "../../services/assignmentService";

function SubmissionForm() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const assignmentIdParam = searchParams.get("assignmentId");

  const [assignments, setAssignments] = useState([]);
  const [submission, setSubmission] = useState({
    assignment: assignmentIdParam || "",
    githubUrl: "",
    notes: "",
    student: user?._id,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const data = await assignmentService.myAssignments();
        setAssignments(data || []);
      } catch (err) {
        console.error("Error fetching assignments:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAssignments();
  }, []);

  const handleChange = (e) => {
    setSubmission({ ...submission, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await create(submission);
      navigate("/submissions");
    } catch (err) {
      console.error("Error creating submission:", err);
      alert("Failed to submit assignment.");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (user?.role !== "Student") {
    return <p>Only students can submit assignments.</p>;
  }

  if(!assignments.length){
    return <h1>No Assignments Assigned to your class yet. come back later</h1>
  }
  return (
    <div>
      <h1>Submit Assignment</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="assignment">Assignment</label>
        <select
          id="assignment"
          name="assignment"
          value={submission.assignment}
          onChange={handleChange}
          required
        >
          <option value="">Select Assignment</option>
          {assignments.map((a) => (
            <option key={a._id} value={a._id}>
              {a.title}
            </option>
          ))}
        </select>

        <label htmlFor="githubUrl">GitHub URL</label>
        <input
          id="githubUrl"
          name="githubUrl"
          type="url"
          value={submission.githubUrl}
          onChange={handleChange}
          placeholder="https://github.com/yourrepo"
          required
        />

        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={submission.notes}
          onChange={handleChange}
          placeholder="Optional notes"
        />

        <button type="submit">Submit Assignment</button>
      </form>
    </div>
  );
}

export default SubmissionForm;
