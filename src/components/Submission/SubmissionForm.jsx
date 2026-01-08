import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import * as assignmentService from "../../services/assignmentService";
import { create } from "../../services/submissionService";
import { UserContext } from "../Contexts/UserContext";

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

  const now = new Date();

  const availableAssignments = assignments.filter(
    (a) => new Date(a.deadline) >= now
  );

  const overdueAssignments = assignments.filter(
    (a) => new Date(a.deadline) < now
  );


  if (user?.role !== "Student") {
    return <p>Only students can submit assignments.</p>;
  }

  if (!assignments.length) {
    return <h1>No Assignments Assigned to your class yet. come back later</h1>
  }
  return (
    <div>
      <h1>Submit Assignment</h1>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="assignment">Assignment</label> */}
        <div>
          <h3>Available Assignments</h3>

          {availableAssignments.length === 0 && (
            <p>No assignments available for submission</p>
          )}

          {availableAssignments.map((a) => (
            <label
              key={a._id}
              style={{
                display: "block",
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "6px",
                cursor: "pointer",
                background:
                  submission.assignment === a._id ? "white" : "black",
              }}
            >
              <input
                type="radio"
                name="assignment"
                value={a._id}
                checked={submission.assignment === a._id}
                onChange={handleChange}
                required
                style={{ marginRight: "10px" }}
              />

              <strong>{a.title}</strong>
              <br />
              <small>
                Deadline:{" "}
                {new Date(a.deadline).toLocaleDateString("en-GB", {
                  timeZone: "Asia/Bahrain",
                })}
              </small>
            </label>
          ))}
        </div>

        <hr />

        <div>
          <h3 style={{ color: "red" }}>Overdue Assignments</h3>

          {overdueAssignments.length === 0 && <p>No overdue assignments 🎉</p>}

          {overdueAssignments.map((a) => (
            <div
              key={a._id}
              style={{
                border: "1px solid #f5c6cb",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "6px",
                background: "#f8d7da",
                color: "#721c24",
              }}
            >
              <strong>{a.title}</strong>
              <br />
              <small>
                Deadline:{" "}
                {new Date(a.deadline).toLocaleDateString("en-GB", {
                  timeZone: "Asia/Bahrain",
                })}{" "}
                (Overdue)
              </small>
            </div>
          ))}
        </div>



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
