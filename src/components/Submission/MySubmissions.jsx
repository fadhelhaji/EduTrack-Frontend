import { useContext, useEffect, useState } from "react";
import {
  deleteSubmission,
  getSubmissions,
} from "../../services/submissionService";
import { UserContext } from "../Contexts/UserContext";
import { ExternalLink, Trash2, Calendar, Layout } from "lucide-react";

const MySubmissions = () => {
  const { user } = useContext(UserContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMySubmissions();
  }, []);

  const fetchMySubmissions = async () => {
    try {
      const data = await getSubmissions();

      const mySubs = data.filter(
        (s) => s.student?._id === user._id
      );

      setSubmissions(mySubs);
      console.log(submissions)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteSubmission(id);
    setSubmissions(submissions.filter((s) => s._id !== id));
  };

if (loading) return <div className="p-20 text-center"><span className="loading loading-dots loading-lg text-[#88c0d0]"></span></div>;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-12">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#88c0d0] mb-2">Student Records</p>
        <h2 className="text-5xl font-black text-[#2e3440] tracking-tighter uppercase">My Submissions</h2>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-[#d8dee9] text-center">
          <p className="text-[#4c566a] opacity-70">No active Submissions found in the archives.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {submissions.map((s) => (
            <div
              key={s._id}
              className="group bg-white p-6 rounded-4xl border border-[#d8dee9] flex flex-col md:flex-row md:items-center justify-between transition-all duration-300 hover:bg-[#2e3440] hover:text-white"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-[#eceff4] group-hover:bg-white/10 rounded-2xl flex items-center justify-center text-[#88c0d0]">
                  <Layout size={28} />
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-tight text-xl">{s.assignment?.title}</h3>
                  <div className="flex items-center gap-4 mt-1 opacity-70 text-xs font-medium">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(s.assignment?.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <a 
                  href={s.githubUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-circle bg-[#88c0d0] border-none text-white hover:bg-[#81a1c1]"
                >
                  <ExternalLink size={18} />
                </a>
                <button 
                  onClick={() => handleDelete(s._id)}
                  className="btn btn-circle bg-red-100 border-none text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
