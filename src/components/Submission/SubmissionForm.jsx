import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import * as assignmentService from "../../services/assignmentService";
import { create } from "../../services/submissionService";
import { UserContext } from "../Contexts/UserContext";
import { Send, Github, MessageSquare, Clock, CheckCircle } from "lucide-react"; 

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
      navigate("/my-submissions");
    } catch (err) {
      console.error("Error creating submission:", err);
      alert("Failed to submit assignment.");
    }
  };

if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-ring loading-lg text-[#88c0d0]"></span>
    </div>
  );

  const now = new Date();

  const availableAssignments = assignments.filter(
    (a) => new Date(a.deadline) >= now
  );

  const overdueAssignments = assignments.filter(
    (a) => new Date(a.deadline) < now
  );


 if (user?.role !== "Student") return <p className="text-center mt-10">Access Denied: Students Only.</p>;

  if (!assignments.length) {
    return <h1>No Assignments Assigned to your class yet. come back later</h1>
  }
  return (
   <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-xl border border-[#d8dee9] overflow-hidden">
        <div className="bg-[#2e3440] p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#88c0d0] opacity-10 blur-3xl rounded-full -mr-20 -mt-20"></div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#88c0d0] mb-2">Command Center || Submit</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase"> Submission</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
          <section>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-[#81a1c1] mb-4 flex items-center gap-2">
              <CheckCircle size={14} /> 01. Select Assignment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableAssignments.map((a) => (
                <label 
                  key={a._id}
                  className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    submission.assignment === a._id 
                    ? "border-[#88c0d0] bg-[#f8fafc]" 
                    : "border-[#d8dee9] hover:border-[#81a1c1]"
                  }`}
                >
                  <input
                    type="radio"
                    name="assignment"
                    value={a._id}
                    checked={submission.assignment === a._id}
                    onChange={handleChange}
                    className="absolute opacity-0"
                    required
                  />
                  <div className="flex flex-col">
                    <span className={`font-bold ${submission.assignment === a._id ? "text-[#2e3440]" : "text-[#4c566a]"}`}>
                      {a.title}
                    </span>
                    <span className="text-[10px] text-[#81a1c1] uppercase mt-1">
                      Due: {new Date(a.deadline).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </section>

          
          {overdueAssignments.length > 0 && (
            <div className="collapse bg-base-200 rounded-2xl">
              <input type="checkbox" /> 
              <div className="collapse-title text-sm font-bold text-red-400 flex items-center gap-2">
                <Clock size={16} /> View {overdueAssignments.length} Overdue Assignments (Locked)
              </div>
              <div className="collapse-content">
                {overdueAssignments.map(a => (
                  <div key={a._id} className="text-xs opacity-50 line-through py-1">{a.title}</div>
                ))}
              </div>
            </div>
          )}

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-[10px] font-black uppercase text-[#81a1c1]">GitHub Repository URL</span>
              </label>
              <div className="relative">
                <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-[#81a1c1]" size={18} />
                <input
                  type="url"
                  name="githubUrl"
                  value={submission.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="input input-bordered w-full pl-12 rounded-2xl border-[#d8dee9] focus:border-[#88c0d0] bg-[#eceff4]/50"
                  required
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-[10px] font-black uppercase text-[#81a1c1]">Brief Notes</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-[#81a1c1]" size={18} />
                <textarea
                  name="notes"
                  value={submission.notes}
                  onChange={handleChange}
                  placeholder="Any deployment notes..."
                  className="textarea textarea-bordered w-full pl-12 rounded-2xl border-[#d8dee9] focus:border-[#88c0d0] bg-[#eceff4]/50 min-h-12"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-block bg-[#2e3440] hover:bg-[#3b4252] text-white border-none rounded-2xl h-16 text-lg font-black uppercase tracking-widest gap-2 group transition-all"
          >
            Send Submission <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmissionForm;
