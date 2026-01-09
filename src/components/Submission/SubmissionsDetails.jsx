import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deleteSubmission, show } from "../../services/submissionService";
import { UserContext } from "../Contexts/UserContext";
import { ArrowLeft, Github, Info, ShieldAlert, Trash2, X, AlertTriangle } from "lucide-react";

function SubmissionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
    try {
      await deleteSubmission(submission._id);
      navigate("/submissions");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><span className="loading loading-infinity loading-lg text-[#88c0d0]"></span></div>;
  if (!submission) return <div className="min-h-[80vh] flex items-center justify-center font-black uppercase text-[#2e3440]">Record Not Found</div>;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-xl border border-[#d8dee9] overflow-hidden">
        
        <div className="bg-[#2e3440] p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#88c0d0] opacity-5 blur-3xl rounded-full -mr-20 -mt-20"></div>
          
          <Link to="/submissions" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-[#88c0d0] hover:text-white transition-colors mb-6">
            <ArrowLeft size={14} /> Back to All Submission
          </Link>
          
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase mb-2">
            Submission Details
          </h1>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#81a1c1]">Terminal ID: {id.slice(-8)}</p>
        </div>

        <div className="p-10 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section>
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#88c0d0] mb-2">01. Assignment</h4>
              <p className="text-xl font-black text-[#2e3440] uppercase tracking-tight">
                {submission.assignment?.title}
              </p>
            </section>

            <section>
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#88c0d0] mb-2">02. Student</h4>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#a3be8c] animate-pulse"></div>
                <p className="text-xl font-black text-[#2e3440] uppercase tracking-tight">
                  {submission.student?.username || submission.student?._id}
                </p>
              </div>
            </section>
          </div>

          <section className="flex items-start gap-4 p-6 rounded-3xl border border-[#d8dee9] bg-[#eceff4]/30">
            <div className="w-10 h-10 bg-[#2e3440] rounded-xl flex items-center justify-center text-white shrink-0">
              <Github size={20} />
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#81a1c1] mb-1">Source Repository</h4>
              <a 
                href={submission.githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="text-sm font-bold text-[#4c566a] hover:text-[#88c0d0] transition-colors break-all underline decoration-2 decoration-[#88c0d0]/30 underline-offset-4"
              >
                {submission.githubUrl}
              </a>
            </div>
          </section>

          <section>
            <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#88c0d0] mb-3 flex items-center gap-2">
              <Info size={14} /> Notes
            </h4>
            <div className="bg-[#f8fafc] p-6 rounded-4xl border border-[#d8dee9]">
              <p className="text-sm font-medium text-[#4c566a] opacity-70 leading-relaxed italic">
                "{submission.notes || "No additional intelligence provided by the operator."}"
              </p>
            </div>
          </section>

          {user?.role === "Student" && (
            <div className="pt-6 border-t border-[#d8dee9] flex justify-end">
              <button 
                onClick={() => setIsDeleteOpen(true)}
                className="btn btn-ghost hover:bg-red-50 text-red-400 font-black uppercase text-[10px] tracking-[0.2em] rounded-xl transition-all"
              >
                <ShieldAlert size={16} className="mr-2" /> Delete Record
              </button>
            </div>
          )}
        </div>
      </div>

      <input type="checkbox" checked={isDeleteOpen} readOnly className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle bg-[#2e3440]/90 backdrop-blur-md">
        <div className="modal-box bg-white rounded-[2.5rem] p-10 border border-[#d8dee9]">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-4xl flex items-center justify-center text-red-500 mb-6">
              <AlertTriangle size={32} />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">Terminal Warning</p>
            <h3 className="text-3xl font-black text-[#2e3440] uppercase tracking-tighter mb-4">Confirm Delete</h3>
            <p className="text-sm font-medium text-[#4c566a] opacity-70 mb-8 max-w-xs">
              You are about to permanently delete this submission from the central database. This action is irreversible.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setIsDeleteOpen(false)}
              className="btn flex-1 bg-[#eceff4] hover:bg-[#d8dee9] border-none text-[#4c566a] rounded-2xl font-black uppercase text-xs tracking-widest h-14"
            >
              Abort
            </button>
            <button 
              onClick={handleDelete}
              className="btn flex-1 bg-red-500 hover:bg-red-600 border-none text-white rounded-2xl font-black uppercase text-xs tracking-widest h-14 shadow-lg shadow-red-200"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmissionDetails;
