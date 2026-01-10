import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deleteSubmission, show, update } from "../../services/submissionService";
import { UserContext } from "../Contexts/UserContext";
import { ArrowLeft, Github, Info, ShieldAlert, AlertTriangle, CheckCircle, MessageSquare, Award } from "lucide-react";
import { toast } from "react-toastify";

function SubmissionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [gradingData, setGradingData] = useState({ grade: "", feedback: "" });

  useEffect(() => {
    async function fetchSubmission() {
      try {
        const data = await show(id);
        setSubmission(data);
        if (data.grade) {
          setGradingData({ grade: data.grade, feedback: data.feedback || "" });
        }
      } catch (err) {
        console.error("Error loading submission:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSubmission();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteSubmission(submission._id);
     navigate(user?.role === "Instructor" ? "/submissions" : "/my-submissions");
    } catch (err) {
      console.error(err);
    }
  };

  const handleGradeSubmit = async (e) => {
  e.preventDefault();
  try {
    await update(id, gradingData);
    const updated = await show(id);
    setSubmission(updated);
    toast.success("Grade Published ");
  } catch (err) {
    toast.error("Failed to sync grade");
  }
};

  if (loading) return <div className="h-screen flex items-center justify-center"><span className="loading loading-infinity loading-lg text-[#88c0d0]"></span></div>;
  if (!submission) return <div className="min-h-[80vh] flex items-center justify-center font-black uppercase text-[#2e3440]">Record Not Found</div>;

  return (
   <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-xl border border-[#d8dee9] overflow-hidden">
        
        <div className="bg-[#2e3440] p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#88c0d0] opacity-5 blur-3xl rounded-full -mr-20 -mt-20"></div>
          <Link 
            to={user?.role === "Instructor" ? "/submissions" : "/my-submissions"} 
            className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-[#88c0d0] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} /> Back to {user?.role === "Instructor" ? "Submission Queue" : "My Submissions"}
          </Link>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Submission Check</h1>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#81a1c1]">Ref: {id}</p>
        </div>

        <div className="p-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section>
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#88c0d0] mb-2">01. Assignment</h4>
              <p className="text-xl font-black text-[#2e3440] uppercase tracking-tight">{submission.assignment?.title}</p>
            </section>
            <section>
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#88c0d0] mb-2">02. Student</h4>
              <p className="text-xl font-black text-[#2e3440] uppercase tracking-tight">{submission.student?.firstName} {submission.student?.lastName}</p>
            </section>
          </div>

          <section className="flex items-start gap-4 p-6 rounded-3xl border border-[#d8dee9] bg-[#eceff4]/30">
            <div className="w-10 h-10 bg-[#2e3440] rounded-xl flex items-center justify-center text-white shrink-0"><Github size={20} /></div>
            <div className="flex-1 overflow-hidden">
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#81a1c1] mb-1">Source Repository</h4>
              <a href={submission.githubUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#4c566a] hover:text-[#88c0d0] transition-colors break-all underline underline-offset-4">{submission.githubUrl}</a>
            </div>
          </section>

          <section>
            <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#88c0d0] mb-3 flex items-center gap-2"><Info size={14} /> Student Notes</h4>
            <div className="bg-[#f8fafc] p-6 rounded-3xl border border-[#d8dee9]">
              <p className="text-sm font-medium text-[#4c566a] opacity-70 leading-relaxed italic">"{submission.notes || "No additional intelligence provided."}"</p>
            </div>
          </section>

          {submission.status === "Graded" && (
            <section className="p-8 bg-[#a3be8c]/10 border border-[#a3be8c]/20 rounded-4xl">
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#a3be8c] mb-4">Grade Result</h4>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-black text-[#2e3440]">{submission.grade}</div>
                  <div className="text-[10px] font-black uppercase text-[#4c566a] leading-none">Percent<br/>Score</div>
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-black uppercase text-[#81a1c1] mb-1">Instructor Feedback</p>
                  <p className="text-sm font-bold text-[#4c566a]">{submission.feedback}</p>
                </div>
              </div>
            </section>
          )}

          {user?.role === "Instructor" && (
            <section className="mt-12 pt-10 border-t border-[#d8dee9]">
              <div className="bg-[#2e3440] p-8 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#88c0d0] opacity-10 blur-3xl"></div>
                <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#88c0d0] mb-6">Instructor Evaluation</h4>
                <form onSubmit={handleGradeSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                      <label className="text-[9px] font-black uppercase text-[#81a1c1] ml-2 mb-2 block">Score (0-100)</label>
                      <div className="relative">
                        <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-[#88c0d0]" size={18} />
                        <input type="number" max="100" min="0" className="input w-full pl-12 rounded-2xl bg-white/5 border-white/10 text-white focus:border-[#88c0d0]" value={gradingData.grade} onChange={(e) => setGradingData({...gradingData, grade: e.target.value})} required />
                      </div>
                    </div>
                    <div className="md:col-span-3">
                      <label className="text-[9px] font-black uppercase text-[#81a1c1] ml-2 mb-2 block">Feedback</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 text-[#88c0d0]" size={18} />
                        <textarea className="textarea w-full pl-12 rounded-2xl bg-white/5 border-white/10 text-white focus:border-[#88c0d0] min-h-12.5" value={gradingData.feedback} onChange={(e) => setGradingData({...gradingData, feedback: e.target.value})} />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-block bg-[#88c0d0] hover:bg-white text-[#2e3440] border-none rounded-2xl h-14 font-black uppercase tracking-widest gap-2 transition-all">
                    <CheckCircle size={20} /> Publish Results
                  </button>
                </form>
              </div>
            </section>
          )}

          {user?.role === "Student" && (
            <div className="pt-6 flex justify-end">
              <button onClick={() => setIsDeleteOpen(true)} className="btn btn-ghost hover:bg-red-50 text-red-400 font-black uppercase text-[10px] tracking-[0.2em] rounded-xl"><ShieldAlert size={16} className="mr-2" /> Delete Submission</button>
            </div>
          )}
        </div>
      </div>

      <input type="checkbox" checked={isDeleteOpen} readOnly className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle bg-[#2e3440]/90 backdrop-blur-md">
        <div className="modal-box bg-white rounded-[2.5rem] p-10 border border-[#d8dee9]">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-4xl flex items-center justify-center text-red-500 mb-6"><AlertTriangle size={32} /></div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">Critical Action</p>
            <h3 className="text-3xl font-black text-[#2e3440] uppercase tracking-tighter mb-4">Delete Record?</h3>
            <p className="text-sm font-medium text-[#4c566a] opacity-70 mb-8 max-w-xs">This data will be permanently removed from the Command Center archives.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setIsDeleteOpen(false)} className="btn flex-1 bg-[#eceff4] hover:bg-[#d8dee9] border-none text-[#4c566a] rounded-2xl font-black uppercase text-xs h-14">Abort</button>
            <button onClick={handleDelete} className="btn flex-1 bg-red-500 hover:bg-red-600 border-none text-white rounded-2xl font-black uppercase text-xs h-14">Confirm Delete</button>
          </div>
        </div>
      </div>
    </div>
  ); 
}

export default SubmissionDetails;
