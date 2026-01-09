import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteSubmission, getSubmissions } from "../../services/submissionService";
import { UserContext } from "../Contexts/UserContext";
import { List, User, Eye, Trash2, Plus, AlertTriangle } from "lucide-react";

function SubmissionList() {
  const { user } = useContext(UserContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

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
    if (!deleteTarget) return;
    try {
      await deleteSubmission(id);
      setSubmissions(submissions.filter((s) => s._id !== id));
    setDeleteTarget(null);
    }
     catch (err) {
      console.error("Failed to delete submission:", err);
      alert("Failed to delete submission.");
    }
  };

if (loading) return 
<div className="flex justify-center p-20">
<span className="loading loading-bars text-[#88c0d0]"></span></div>;
  
return (
      <div className="min-h-[80vh] flex flex-col items-center p-4">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#88c0d0] mb-2">
              Registry // {user?.role}
            </p>
            <h1 className="text-5xl font-black text-[#2e3440] tracking-tighter uppercase">
              {user?.role === "Student" ? "My Submissions" : "All Submissions"}
            </h1>
          </div>
          {user?.role === "Student" && (
            <Link to="/submissions/new" className="btn bg-[#2e3440] text-white rounded-2xl border-none hover:bg-[#3b4252] gap-2 px-6 font-black uppercase text-xs tracking-widest">
              <Plus size={16} /> New Submission
            </Link>
          )}
        </div>

        {error && <div className="alert alert-error rounded-2xl mb-6 text-xs font-black uppercase tracking-widest">{error}</div>}

        <div className="space-y-4">
          {submissions.length === 0 ? (
            <div className="bg-white p-20 rounded-[2.5rem] border border-[#d8dee9] text-center">
              <p className="text-sm font-medium text-[#4c566a] opacity-70">Zero entries detected in the archives.</p>
            </div>
          ) : (
            submissions.map((s) => (
              <div key={s._id} className="group bg-white p-6 rounded-[2.5rem] border border-[#d8dee9] hover:bg-[#2e3440] transition-all duration-300 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#eceff4] group-hover:bg-white/10 flex items-center justify-center text-[#88c0d0]">
                    <List size={24} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-[#81a1c1] uppercase tracking-[0.2em]">Assignment</p>
                    <p className="font-black text-[#2e3440] group-hover:text-white text-xl tracking-tight uppercase">{s.assignment?.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#eceff4] group-hover:bg-white/10 flex items-center justify-center text-[#81a1c1]">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-[#81a1c1] uppercase tracking-[0.2em]">Student</p>
                    <p className="font-medium text-[#4c566a] group-hover:text-white/70 text-sm">{s.student?.username || s.student?._id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  <Link to={`/submission/${s._id}`} className="btn btn-sm rounded-xl bg-[#eceff4] group-hover:bg-white/10 border-none group-hover:text-white text-[#2e3440] font-black uppercase text-[10px] tracking-widest px-4">
                    <Eye size={14} className="mr-1" /> check
                  </Link>
                  {user?.role === "Student" && (
                    <button onClick={() => setDeleteTarget(s._id)} className="btn btn-sm bg-red-50 hover:bg-red-500 border-none text-red-400 hover:text-white rounded-xl">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <input type="checkbox" checked={!!deleteTarget} readOnly className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle bg-[#2e3440]/90 backdrop-blur-md">
        <div className="modal-box bg-white rounded-[2.5rem] p-10 border border-[#d8dee9]">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-4xl flex items-center justify-center text-red-500 mb-6">
              <AlertTriangle size={32} />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">Terminal Warning</p>
            <h3 className="text-3xl font-black text-[#2e3440] uppercase tracking-tighter mb-4">Confirm Delete</h3>
            <p className="text-sm font-medium text-[#4c566a] opacity-70 mb-8 max-w-xs">
              Are you sure you want to delete this submission? This action is irreversible.
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setDeleteTarget(null)} className="btn flex-1 bg-[#eceff4] hover:bg-[#d8dee9] border-none text-[#4c566a] rounded-2xl font-black uppercase text-xs tracking-widest h-14">
              Abort
            </button>
            <button onClick={handleDelete} className="btn flex-1 bg-red-500 hover:bg-red-600 border-none text-white rounded-2xl font-black uppercase text-xs tracking-widest h-14">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmissionList;
