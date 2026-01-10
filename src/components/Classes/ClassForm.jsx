import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import * as classService from '../../services/classService'
import { School, Save, ArrowLeft, Terminal } from "lucide-react";

function ClassForm() {
    const {id} = useParams()
    const navigate = useNavigate()

    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        className: '',
        program: '',
        schedule: ''
    })

    useEffect(() => {
        if (!isEdit) return;

            async function fetchClass() {
                try {
                    const data = await classService.show(id);
                    const cls = data.class || data;
                    setFormData({
                    className: cls.className,
                    program: cls.program,
                    schedule: cls.schedule
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        fetchClass();
    }, [id, isEdit]);

    async function handleSubmit(e){
        e.preventDefault()
        try {
            if (isEdit) {
                await classService.update(id, formData);
            } else {
                await classService.create(formData);
            }
        } catch(error){
            console.log(error);
        }
        navigate('/class')
    }

    function handleChange(e){
        setFormData({...formData, [e.target.name] : e.target.value})
    }
  return (

    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-500">
        <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#d8dee9]">
           
           <div className="bg-[#2e3440] p-8 text-white relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <School size={80} />
                </div>
                <button 
                    onClick={() => navigate('/class')} 
                    className="flex items-center gap-2 text-[#88c0d0] text-xs font-black uppercase tracking-widest mb-4 hover:text-white transition-colors"
                >
                    <ArrowLeft size={14} /> Back to Class
                </button> 

        <h1 className="text-3xl font-black uppercase tracking-tighter italic">
            {isEdit ? 'Edit Class' : 'Create a Class'}</h1>
            <p className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em] mt-2">
                    {isEdit ? 'Modifying existing class parameters' : 'Creating new Class'}
                </p>
            </div>

            {/* form  */}
            <form onSubmit={handleSubmit} className="p-10 space-y-6">
                <div className="space-y-2">
                    
            <label htmlFor="className" className="flex items-center gap-2 text-[11px] font-black uppercase text-[#4c566a] ml-1">
                <Terminal size={12} className="text-[#88c0d0]"/>
                Class Name
            </label>
            <input name='className' id='className' value={formData.className} onChange={handleChange} type="text" placeholder="Enter Class Name" className="input w-full bg-[#eceff4] border-none rounded-2xl focus:ring-2 focus:ring-[#88c0d0] font-bold text-[#2e3440] placeholder:text-[#4c566a]/30"
                        required/>
                </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
            <label htmlFor="program" className="text-[11px] font-black uppercase text-[#4c566a] ml-1">Program</label>
            <select name="program" value={formData.program} onChange={handleChange} required className="select w-full bg-[#eceff4] border-none rounded-2xl focus:ring-2 focus:ring-[#88c0d0] font-bold text-[#2e3440]">
                <option value="">Select Program</option>
                <option value="SEB">Software Engineering</option>
                <option value="UI-UX">UI-UX Design</option>
                <option value="Java">Java</option>
                <option value="DS">Data Science</option>
                <option value="DA">Data Analytics</option>
            </select>
            </div>

            <div className="space-y-2">
            <label htmlFor="schedule" className="text-[11px] font-black uppercase text-[#4c566a] ml-1">Schedule</label>
            <select name="schedule" value={formData.schedule} onChange={handleChange} required className="select w-full bg-[#eceff4] border-none rounded-2xl focus:ring-2 focus:ring-[#88c0d0] font-bold text-[#2e3440]">
                <option value="">Select Schedule</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
            </select>
            </div>
            </div>

            <div className="pt-6">
                    <button 
                        type="submit"
                        className="btn w-full bg-[#2e3440] hover:bg-[#3b4252] text-white border-none rounded-2xl h-14 flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95"
                    >
                        <Save size={18} className="text-[#88c0d0]" />
                        <span className="font-black uppercase tracking-widest text-sm">
                            {isEdit ? 'Update Class' : ' Create Class'}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default ClassForm