import { useEffect, useState } from 'react';
import * as classService from '../../services/classService';
import { Link } from 'react-router';
import { School, ArrowRight, Plus } from 'lucide-react';

function ClassList() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClasses() {
      try {
        const data = await classService.index();
        setClasses(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchClasses();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <span className="loading loading-ring loading-lg text-[#88c0d0]"></span>
    </div>
  );

  return (
  <div className="min-h-[80vh] flex flex-col p-4 max-w-5xl mx-auto">
  <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="font-black text-[#2e3440] text-5xl tracking-tighter uppercase">Class Center</h1>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#88c0d0] mt-2">Active Academic Tracks</p>
        </div>
        <Link to="/class/new" className="btn bg-[#2e3440] hover:bg-[#88c0d0] text-white border-none rounded-2xl px-6">
          <Plus size={18} /> New Class
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.length === 0 ? (
          <div className="col-span-full bg-white rounded-[2.5rem] p-12 border border-[#d8dee9] text-center">
            <p className="text-[#4c566a] opacity-70">No classes found </p>
          </div>
        ) : (
          classes.map((cls) => (
            <Link to={`/class/${cls._id}`} key={cls._id}>
              <div className="group bg-white rounded-[2.5rem] p-8 border border-[#d8dee9] transition-all duration-500 hover:bg-[#2e3440] hover:scale-[1.02] shadow-sm hover:shadow-2xl">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 rounded-2xl bg-[#eceff4] text-[#88c0d0] group-hover:bg-white/10">
                    <School size={28} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#a3be8c] animate-pulse"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#4c566a] group-hover:text-white/50">Active</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-[#2e3440] group-hover:text-white mb-2 uppercase tracking-tight">
                  {cls.className}
                </h3>
                
                <div className="flex gap-4 mt-4">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#88c0d0]/10 text-[#88c0d0] group-hover:bg-white/20">
                    {cls.program}
                  </span>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#81a1c1]/10 text-[#81a1c1] group-hover:bg-white/20">
                    {cls.schedule}
                  </span>
                </div>

                <div className="mt-8 flex items-center justify-between text-[#88c0d0] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold uppercase tracking-widest">Enter Classroom</span>
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default ClassList;
