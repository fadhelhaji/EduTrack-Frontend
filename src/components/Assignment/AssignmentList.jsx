import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import * as assignmentService from '../../services/assignmentService';
import { FileText, ArrowRight, Layers } from "lucide-react";

function AssignmentList(){
const [assignments, setAssignments] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(()=>{
    async function fetchAssignments(){
        try {
            const data = await assignmentService.index();
            setAssignments(data || []);
        } catch (error) {
            console.log("Error fetching assignments:", error);
        }
        finally {
        setLoading(false);
      }
    }
    fetchAssignments();
},[])

  if (loading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <span className="loading loading-dots loading-lg text-[#88c0d0]"></span>
        </div>
    );

return (
<div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in duration-700">
            <div className="flex items-center justify-between border-b border-[#d8dee9] pb-6">
                <div>
                    <h1 className="text-4xl font-black text-[#2e3440] uppercase tracking-tighter">Assignment Control</h1>
                    <p className="text-sm text-[#4c566a] font-bold opacity-60 uppercase tracking-widest mt-1">All Active Assignment Modules</p>
                </div>
                <div className="bg-[#88c0d0]/20 p-3 rounded-2xl text-[#88c0d0]">
                    <Layers size={32} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignments.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-[#d8dee9]">
                        <p className="text-[#4c566a] italic font-bold">No active Assignment found</p>
                    </div>
                ) : (
                    assignments.map((assignment) => (
                        <Link 
                            to={`/class/${assignment.class?._id || assignment.class}/assignment/${assignment._id}`} 
                            key={assignment._id}
                            className="group bg-white p-6 rounded-4xl border border-[#d8dee9] hover:border-[#88c0d0] hover:shadow-xl transition-all duration-300 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-[#eceff4] group-hover:bg-[#2e3440] rounded-2xl flex items-center justify-center text-[#4c566a] group-hover:text-[#88c0d0] transition-colors">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h3 className="font-black text-lg text-[#2e3440] group-hover:text-[#2e3440] uppercase tracking-tight">
                                        {assignment.title}
                                    </h3>
                                    <p className="text-[10px] font-bold text-[#88c0d0] uppercase tracking-widest">
                                        {assignment.class?.className || "View Details"}
                                    </p>
                                </div>
                            </div>
                            <ArrowRight size={20} className="text-[#d8dee9] group-hover:text-[#88c0d0] group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))
                )}
            </div>
        </div>
);

}

export default AssignmentList;