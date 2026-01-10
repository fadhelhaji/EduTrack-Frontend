import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteSubmission, getSubmissions } from "../../services/submissionService";
import { UserContext } from "../Contexts/UserContext";
import { ExternalLink, Trash2, Calendar, Layout, Eye, Award } from "lucide-react";

const MySubmissions = () => {
  const { user } = useContext(UserContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMySubmissions();
  }, [user._id]);

  const fetchMySubmissions = async () => {
    try {
      const data = await getSubmissions();
      const mySubs = data.filter((s) => s.student?._id === user._id);
      setSubmissions(mySubs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubmission(id);
      setSubmissions(submissions.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <span className="loading loading-infinity loading-lg text-[#88c0d0]"></span>
    </div>
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-12 ml-4">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#88c0d0] mb-2">Student Archive</p>
          <h2 className="text-6xl font-black text-[#2e3440] tracking-tighter uppercase">My Submissions</h2>
        </div>

        {submissions.length === 0 ? (
          <div className="bg-white p-20 rounded-[2.5rem] border border-dashed border-[#d8dee9] text-center">
            <div className="w-20 h-20 bg-[#eceff4] rounded-full flex items-center justify-center mx-auto mb-6 text-[#81a1c1]">
              < Layout size={32} />
            </div>
            <p className="text-sm font-black uppercase tracking-widest text-[#4c566a] opacity-40">Zero Records Found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {submissions.map((s) => (
              <div
                key={s._id}
                className="group bg-white p-8 rounded-[2.5rem] border border-[#d8dee9] flex flex-col md:flex-row md:items-center justify-between transition-all duration-500 hover:bg-[#2e3440] hover:text-white hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-[#eceff4] group-hover:bg-white/10 rounded-2xl flex items-center justify-center text-[#88c0d0] transition-colors">
                      <Layout size={28} />
                    </div>
                    <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-4 border-white group-hover:border-[#2e3440] animate-pulse ${s.grade ? 'bg-[#a3be8c]' : 'bg-[#81a1c1]'}`}></div>
                  </div>

                  <div>
                    <h3 className="font-black uppercase tracking-tighter text-2xl mb-1">{s.assignment?.title || "Untitled Assignment"}</h3>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#81a1c1]">
                        <Calendar size={12} /> {new Date(s.createdAt).toLocaleDateString()}
                      </span>
                      {s.grade && (
                        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#a3be8c]">
                          <Award size={12} /> Graded
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-6 md:mt-0">
                  {s.grade && (
                    <div className="text-right mr-4">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#88c0d0] opacity-50 group-hover:opacity-100">Score</p>
                      <p className="text-3xl font-black tracking-tighter group-hover:text-white">{s.grade}<span className="text-sm opacity-50">/100</span></p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Link
                      to={`/submission/${s._id}`}
                      className="btn btn-circle bg-[#eceff4] border-none text-[#2e3440] hover:bg-[#88c0d0] hover:text-white transition-all"
                    >
                      <Eye size={18} />
                    </Link>
                    <a
                      href={s.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-circle bg-[#eceff4] border-none text-[#2e3440] hover:bg-[#88c0d0] hover:text-white transition-all"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="btn btn-circle bg-red-50 border-none text-red-400 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubmissions;