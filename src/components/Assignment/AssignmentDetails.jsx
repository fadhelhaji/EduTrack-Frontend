import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import * as assignmentService from '../../services/assignmentService';
import { AlertTriangle, Calendar, Trash2, Edit3, ArrowLeft, Info, CheckCircle } from "lucide-react";

function AssignmentDetails() {
  const { classId, assignmentId } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      if (!classId || classId === "null" || !assignmentId) {
      return;
    }
      try {
        const data = await assignmentService.getAssignmentForClass(classId, assignmentId);
        setAssignment(data);
      } catch (error) {
        console.log("Error loading assignment details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [classId, assignmentId]);

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
  <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="btn btn-ghost gap-2 text-[#4c566a] font-black uppercase text-xs tracking-widest">
            <ArrowLeft size={16} /> Return
        </button>
        <div className="flex gap-2">
            <Link to={`/class/${classId}/assignment/${assignment._id}/edit`}>
                <button className="btn bg-[#81a1c1] hover:bg-[#5e81ac] text-white border-none rounded-xl btn-sm h-10 px-4">
                    <Edit3 size={16} /> Edit Assignment
                </button>
            </Link>
            <button 
              onClick={() => setIsDeleteOpen(true)} 
              className="btn bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border-none rounded-xl btn-sm h-10 px-4"
            >
                <Trash2 size={16} /> Delete Assignment
            </button>
        </div>
      </div>

      
      <div className="bg-white rounded-[2.5rem] border border-[#d8dee9] shadow-2xl overflow-hidden">
        <div className="bg-[#2e3440] p-10 text-white flex justify-between items-start">
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#88c0d0] mb-2">Assignment Title</p>
                <h1 className="text-4xl font-black uppercase tracking-tighter">{assignment.title}</h1>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl">
                <CheckCircle className="text-[#a3be8c]" size={32} />
            </div>
        </div>

        <div className="p-10 space-y-10">
            <div className="flex gap-8 border-b border-[#eceff4] pb-8">
                <div className="flex items-center gap-3">
                    <Calendar className="text-[#88c0d0]" size={20} />
                    <div>
                        <p className="text-[9px] font-black uppercase text-[#4c566a] opacity-50">Deadline</p>
                        <p className="font-bold text-[#2e3440]">
                            {assignment.deadline ? new Date(assignment.deadline).toLocaleDateString(undefined, { dateStyle: 'long' }) : "No deadline"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Info className="text-[#88c0d0]" size={20} />
                    <div>
                        <p className="text-[9px] font-black uppercase text-[#4c566a] opacity-50">Status</p>
                        <p className="font-bold text-[#a3be8c]">Active Assignment</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#4c566a]">Description</h3>
                <div className="text-lg leading-relaxed text-[#4c566a] bg-[#f8fafc] p-8 rounded-3xl border border-[#eceff4] italic">
                    {assignment.description}
                </div>
            </div>
        </div>
      </div>

      {isDeleteOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-[#2e3440] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative">
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-500 opacity-10 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 animate-pulse">
                <AlertTriangle size={40} />
              </div>
              
              <div>
                <h3 className="font-black text-3xl uppercase tracking-tighter text-white mb-2">
                  Delete Assignment
                </h3>
                <p className="text-[#d8dee9] opacity-70 leading-relaxed">
                  Are you sure you want to delete <span className="text-[#88c0d0] font-bold">{assignment.title}</span>? 
                  This action is permanent and cannot be reversed.
                </p>
              </div>

              <div className="flex w-full gap-4 pt-4">
                <button 
                  onClick={() => setIsDeleteOpen(false)}
                  className="flex-1 btn bg-[#4c566a] hover:bg-[#434c5e] border-none text-white rounded-2xl h-14"
                >
                  Abort
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex-1 btn bg-red-500 hover:bg-red-600 border-none text-white rounded-2xl h-14"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop bg-[#2e3440]/80 backdrop-blur-md" onClick={() => setIsDeleteOpen(false)}></div>
        </div>
      )}
    </div>
  );
}

export default AssignmentDetails;
