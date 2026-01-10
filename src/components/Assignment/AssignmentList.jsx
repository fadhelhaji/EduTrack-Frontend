import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';
import * as assignmentService from '../../services/assignmentService';
import { FileText, ArrowRight, Layers } from "lucide-react";
import { UserContext } from '../Contexts/UserContext';

function AssignmentList() {
    const { user } = useContext(UserContext);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAssignments() {
            try {
                let data;
                if (user?.role === "Instructor") {
                    data = await assignmentService.index();
                } else {
                    data = await assignmentService.myAssignments();
                }
                setAssignments(data || []);
            } catch (error) {
                console.log("Error fetching assignments:", error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchAssignments();
    }, [user])

    if (loading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <span className="loading loading-dots loading-lg text-[#88c0d0]"></span>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in duration-700">
            <div className="flex items-center justify-between border-b border-[#d8dee9] pb-6">
                <div>
                    <h1 className="text-4xl font-black text-[#2e3440] uppercase tracking-tighter">
                        {user?.role === "Instructor" ? "Assignment Control" : "Your Assignments"}
                    </h1>
                    <p className="text-sm text-[#4c566a] font-bold opacity-60 uppercase tracking-widest">
                        {user?.role === "Instructor" ? "Manage and track student tasks" : "View your class assignments"}
                    </p>
                </div>
                {user?.role === "Instructor" && (
                    <Link to="/assignment/new" className="btn bg-[#2e3440] text-white border-none rounded-2xl hover:bg-[#3b4252]">
                        New Assignment
                    </Link>
                )}
            </div>

            <div className="grid gap-4">
                {assignments.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-4xl border border-dashed border-[#d8dee9]">
                        <Layers size={48} className="mx-auto text-[#d8dee9] mb-4" />
                        <p className="font-bold text-[#4c566a]">No assignments found.</p>
                    </div>
                ) : (
                    assignments.map((assignment) => (
                        <Link
                            key={assignment._id}
                            to={
                                user?.role === "Instructor"
                                    ? `/class/${assignment.class?._id || "null"}/assignment/${assignment._id}`
                                    : `/assignment/${assignment._id}`
                            }
                            className="group bg-white p-6 rounded-4xl border border-[#d8dee9] hover:border-[#88c0d0] hover:shadow-xl transition-all duration-300 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-[#eceff4] group-hover:bg-[#2e3440] rounded-2xl flex items-center justify-center text-[#4c566a] group-hover:text-[#88c0d0] transition-colors">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h3 className="font-black text-lg text-[#2e3440] uppercase tracking-tight">
                                        {assignment.title}
                                    </h3>
                                    <p className="text-[10px] font-bold text-[#88c0d0] uppercase tracking-widest">
                                        {assignment.class?.className || "General Class"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <p className="text-[9px] font-black text-[#4c566a] uppercase opacity-40">Deadline</p>
                                    <p className="text-xs font-bold text-[#2e3440]">
                                        {new Date(assignment.deadline).toLocaleDateString()}
                                    </p>
                                </div>
                                <ArrowRight size={20} className="text-[#d8dee9] group-hover:text-[#88c0d0] group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );

}

export default AssignmentList;