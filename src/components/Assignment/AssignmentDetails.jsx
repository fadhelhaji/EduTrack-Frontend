import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import * as assignmentService from '../../services/assignmentService';
import * as submissionService from '../../services/submissionService';
import {
  AlertTriangle, Calendar, Trash2, Edit3, ArrowLeft,
  Info, CheckCircle
} from "lucide-react";
import { UserContext } from '../Contexts/UserContext';

function AssignmentDetails() {
  const { id, classId, assignmentId } = useParams();
  const actualAssignmentId = id || assignmentId;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      try {
        let data;
        if (classId && assignmentId) {
          data = await assignmentService.getAssignmentForClass(classId, assignmentId);
        } else {
          data = await assignmentService.show(actualAssignmentId);
        }
        setAssignment(data);

        if (user?.role === "Instructor") {
          const subs = await submissionService.getSubmissionsByAssignment(actualAssignmentId);
          setSubmissions(subs || []);
        }
      } catch (error) {
        console.log("Error loading assignment details:", error);
      } finally {
        setLoading(false);
      }
    }
    if (actualAssignmentId) fetchDetails();
  }, [classId, assignmentId, user, actualAssignmentId]);

  const handleDelete = async () => {
    try {
      await assignmentService.remove(assignment._id);
      navigate(`/class/${classId}`);
    } catch (error) {
      console.log("Error deleting assignment:", error);
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-[#88c0d0]"></span>
    </div>
  );

  if (!assignment) return <div className="text-center p-20 font-black text-red-400 uppercase">Module Redacted or Not Found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#d8dee9] pb-8">
        <div className="space-y-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#81a1c1] font-black text-[10px] uppercase tracking-widest hover:text-[#5e81ac] transition-colors">
            <ArrowLeft size={14} /> Back to Dashboard
          </button>
          <div className="space-y-1">
            <h1 className="text-5xl font-black text-[#2e3440] uppercase tracking-tighter leading-none">
              {assignment.title}
            </h1>
            <p className="text-[#88c0d0] font-bold uppercase tracking-[0.2em] text-xs">
              Class: {assignment.class?.className || "General"}
            </p>
          </div>
        </div>

        {user?.role === "Instructor" && (
          <div className="flex gap-3">
            <Link
              to={`/class/${assignment.class?._id || assignment.class}/assignment/${assignment._id}/edit`}
              className="btn bg-white border-[#d8dee9] text-[#4c566a] hover:bg-[#eceff4] rounded-2xl px-6"
            >
              <Edit3 size={18} /> Edit
            </Link>

            <button onClick={() => setIsDeleteOpen(true)} className="btn bg-red-50 border-none text-red-500 hover:bg-red-500 hover:text-white rounded-2xl px-6">
              <Trash2 size={18} /> Delete
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-4xl border border-[#d8dee9] shadow-sm">
            <h2 className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-[#4c566a] mb-6 opacity-50">
              <Info size={16} /> Assignment Brief
            </h2>
            <p className="text-[#4c566a] leading-relaxed font-medium whitespace-pre-wrap">
              {assignment.description}
            </p>
          </div>

          {user?.role === "Student" ? (
            <div className="bg-[#2e3440] p-8 rounded-4xl text-white flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Ready to Submit?</h3>
                <p className="text-[#81a1c1] text-sm font-bold">Push your GitHub repository for review</p>
              </div>

              <Link
                to={`/submissions/new?assignmentId=${actualAssignmentId}`}
                className="btn bg-[#88c0d0] hover:bg-[#8fbcbb] border-none text-[#2e3440] font-black rounded-2xl px-8"
              >
                Open Submission Form
              </Link>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-4xl border border-[#d8dee9]">
              <h2 className="text-[11px] font-black uppercase tracking-widest text-[#4c566a] mb-6 opacity-50 flex items-center gap-2">
                <CheckCircle size={16} /> Student Submissions ({submissions.length})
              </h2>
              {submissions.length === 0 ? (
                <p className="text-center py-10 text-[#d8dee9] font-bold italic">No submissions yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr className="text-[10px] uppercase text-[#4c566a]">
                        <th>Student</th>
                        <th>Status</th>
                        <th>Grade</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((sub) => (
                        <tr key={sub._id} className="hover:bg-[#eceff4]/50 transition-colors">
                          <td className="font-bold text-[#2e3440]">
                            {sub.student?.firstName} {sub.student?.lastName}
                          </td>
                          <td>
                            <span className={`badge border-none font-black text-[9px] uppercase px-3 ${sub.status === 'Graded' ? 'bg-[#a3be8c] text-white' : 'bg-[#ebcb8b] text-[#2e3440]'
                              }`}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="font-black text-[#81a1c1]">
                            {sub.grade !== null ? `${sub.grade}%` : '--'}
                          </td>
                          <td>
                            <Link to={`/submission/${sub._id}`} className="btn btn-ghost btn-xs text-[#88c0d0]">
                              View / Grade
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-[#eceff4] p-6 rounded-4xl border border-[#d8dee9]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#88c0d0] shadow-sm">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#4c566a] uppercase opacity-50">Submission Deadline</p>
                <p className="font-black text-[#2e3440]">
                  {new Date(assignment.deadline).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="p-4 bg-white/50 rounded-2xl border border-dashed border-[#d8dee9]">
              <p className="text-[9px] font-bold text-[#4c566a] uppercase text-center">
                Assignments are locked for grading 24h after deadline
              </p>
            </div>
          </div>
        </div>
      </div>

      {isDeleteOpen && (
        <div className="modal modal-open bg-[#2e3440]/80 backdrop-blur-sm">
          <div className="modal-box bg-[#2e3440] text-white rounded-4xl border border-white/10 p-10">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 animate-pulse">
                <AlertTriangle size={40} />
              </div>
              <h3 className="font-black text-3xl uppercase tracking-tighter">Delete Assignment?</h3>
              <p className="text-[#d8dee9] opacity-70">This action is permanent and will delete all student submissions for this assignment.</p>
              <div className="flex w-full gap-4 pt-4">
                <button onClick={() => setIsDeleteOpen(false)} className="flex-1 btn bg-[#4c566a] border-none text-white rounded-2xl">Abort</button>
                <button onClick={handleDelete} className="flex-1 btn bg-red-500 hover:bg-red-600 border-none text-white rounded-2xl">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignmentDetails;
