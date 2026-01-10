import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as assignmentService from '../../services/assignmentService';
import * as classService from '../../services/classService';
import { FilePlus, Calendar, Type, AlignLeft, Layout, Save, ArrowLeft } from "lucide-react";

function AssignmentForm() {
    const navigate = useNavigate()
    const { id, assignmentId } = useParams();
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assignment, setAssignment] = useState({
        title: '',
        description: '',
        deadline: '',
        class: ''
    })

    async function handleSubmit(e) {
        e.preventDefault();
        const finalClassId = id || assignment.class;
        
        if (!finalClassId) {
            toast.error("Please select a class");
            return;
        }

        try {
            if (assignmentId) {
                await assignmentService.update(assignmentId, assignment);
                toast.success("Assignment updated successfully!");
                navigate(`/class/${finalClassId}`);
            } else {
                await classService.createAssignment(finalClassId, assignment);
                toast.success("Assignment created successfully!");
                navigate(`/class/${finalClassId}`);
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const classData = await classService.index();
                setClasses(classData || []);
                if (assignmentId) {
                    const data = await assignmentService.show(assignmentId);
                    if (data) {
                        setAssignment({
                            title: data.title || '',
                            description: data.description || '',
                            deadline: data.deadline ? new Date(data.deadline).toISOString().split('T')[0] : '',
                            class: data.class?._id || data.class || id || ''
                        });} } 
                else if (id) {
                    setAssignment(prev => ({
                        ...prev,
                        class: id
                    }));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [assignmentId, id]);

    function handleChange(e) {
        setAssignment({ ...assignment, [e.target.name]: e.target.value })
    }

    if (loading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <span className="loading loading-ring loading-lg text-[#88c0d0]"></span>
        </div>
    )

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-500">
            <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#d8dee9]">
                
                <div className="bg-[#3b4252] p-8 text-white relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <FilePlus size={80} />
                    </div>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-2 text-[#88c0d0] text-xs font-black uppercase tracking-widest mb-4 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={14} /> Back
                    </button>
                    <h1 className="text-3xl font-black uppercase tracking-tighter italic">
                        {assignmentId ? "Edit Assignment" : "Create Assignment"}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="flex items-center gap-2 text-[11px] font-black uppercase text-[#4c566a] ml-1">
                            <Type size={12} className="text-[#88c0d0]" /> Title
                        </label>
                        <input 
                            value={assignment.title} 
                            onChange={handleChange} 
                            name='title' 
                            id='title' 
                            type="text" 
                            className="input w-full bg-[#eceff4] border-none rounded-2xl focus:ring-2 focus:ring-[#88c0d0] font-bold text-[#2e3440]"
                            placeholder="Assignment title" 
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="flex items-center gap-2 text-[11px] font-black uppercase text-[#4c566a] ml-1">
                            <AlignLeft size={12} className="text-[#88c0d0]" /> Description
                        </label>
                        <textarea 
                            value={assignment.description} 
                            onChange={handleChange} 
                            name='description' 
                            id='description' 
                            className="textarea w-full bg-[#eceff4] border-none rounded-2xl focus:ring-2 focus:ring-[#88c0d0] font-bold text-[#2e3440] min-h-32 pt-4" 
                            placeholder="Assignment requirements" 
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="deadline" className="flex items-center gap-2 text-[11px] font-black uppercase text-[#4c566a] ml-1">
                                <Calendar size={12} className="text-[#88c0d0]"/> Deadline
                            </label>
                            <input 
                                value={assignment.deadline} 
                                onChange={handleChange} 
                                name='deadline' 
                                id='deadline' 
                                type="date" 
                                className="input w-full bg-[#eceff4] border-none rounded-2xl focus:ring-2 focus:ring-[#88c0d0] font-bold text-[#2e3440]" 
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[11px] font-black uppercase text-[#4c566a] ml-1">
                                <Layout size={12} className="text-[#88c0d0]" /> Assigned Class
                            </label>
                            <select 
                                name="class" 
                                value={assignment.class} 
                                onChange={handleChange} 
                                disabled={!!id}
                                className="select w-full bg-[#eceff4] border-none rounded-2xl focus:ring-2 focus:ring-[#88c0d0] font-bold text-[#2e3440]"
                            >
                                <option value="">Select a Class</option>
                                {classes.map((one) => (
                                    <option value={one._id} key={one._id}>{one.className}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn w-full bg-[#2e3440] hover:bg-[#3b4252] text-white border-none rounded-2xl h-14 flex items-center justify-center gap-3 mt-4 transition-all active:scale-95 shadow-xl"
                    >
                        <Save size={18} className="text-[#88c0d0]" />
                        <span className="font-black uppercase tracking-widest">
                            {assignmentId ? "Update Assignment" : "Create Assignment"}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AssignmentForm;