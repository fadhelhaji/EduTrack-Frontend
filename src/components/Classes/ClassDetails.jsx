import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import * as classService from "../../services/classService";
import { UserPlus, Trash2, Edit3, BookOpen, Users, ArrowRight, AlertTriangle } from "lucide-react";

function ClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState([])
  const [availableStudents, setAvailableStudents] = useState([])
  const [classStudents, setClassStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
  })

  async function refreshClass() {
  try {
    const data = await classService.show(id)
    setCls(data.class)
    setAssignment(data.assignment)
    setAvailableStudents(data.availableStudents)
    setClassStudents(data.classStudents)
  } catch (err) {
   console.error("Refresh Class Error:", err);
  } finally {
    setLoading(false)
  }
}
console.log("Class Students:", classStudents);



useEffect(() => {
  refreshClass()
}, [id])

  async function handleAddStudent() {
  try {
    await classService.addStudent(id, selectedStudent)
  setSelectedStudent('')
  refreshClass()
  } catch (err) {
    console.log(err)
  }
}

async function handleRemoveStudent(studentId) {
  try {
    await classService.removeStudent(id, studentId)
  refreshClass()
  } catch (err) {
    console.log(err)
  }
}

  const handleDelete = async () => {
      try {
      await classService.remove(cls._id);
      navigate("/class");
    } catch (error) {
      console.log(error);
    } 
  };

  if (loading) return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <span className="loading loading-bars text-[#88c0d0]"></span>
    </div>
  );

  if (!cls) return (
    <div className="text-center p-10">
      <p className="text-[#bf616a] font-bold">Access Denied or Class Not Found</p>
      <Link to="/class" className="text-[#88c0d0] underline">Return to Dashboard</Link>
    </div>
  );

  return (
  <div className="min-h-[80vh] max-w-5xl mx-auto p-4 space-y-8 animate-in fade-in duration-500">
      
      
      <div className="bg-[#2e3440] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#88c0d0] opacity-10 blur-3xl"></div>
        
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#88c0d0] mb-4">
            Authorized Personnel Only
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
            {cls.className}
          </h1>
          
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase text-white/40">Instructor (Lead)</span>
              <span className="font-bold text-[#81a1c1]">{cls.instructor?.username || "Verified"}</span>
            </div>
            <div className="h-8 w-px bg-white/10 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase text-white/40">Program</span>
              <span className="font-bold">{cls.program}</span>
            </div>
          </div>

          <div className="mt-10 flex gap-3">
            <Link to={`/class/${cls._id}/edit`} className="btn bg-white/10 hover:bg-white/20 border-none text-white rounded-2xl capitalize">
              <Edit3 size={16} /> Edit Details
            </Link>
            
            <button 
              onClick={() => setIsDeleteOpen(true)} 
              className="btn bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border-none rounded-2xl capitalize transition-all"
            >
              <Trash2 size={16} /> Delete Class
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       
        <div className="bg-white rounded-[2.5rem] p-8 border border-[#d8dee9] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <BookOpen className="text-[#88c0d0]" />
              <h3 className="font-black text-[#2e3440] uppercase tracking-tight text-xl">Course Work</h3>
            </div>
            <Link to={`/class/${cls._id}/assignment/new`} className="btn btn-sm bg-[#eceff4] text-[#2e3440] border-none rounded-xl hover:bg-[#88c0d0] hover:text-white transition-colors">
              New Assignment
            </Link>
          </div>

          <div className="space-y-3">
            {assignment && assignment.length > 0 ? (
              assignment.map((a) => (
                <Link to={`/class/${cls._id}/assignment/${a._id}`} key={a._id} 
                  className="flex items-center justify-between p-4 rounded-2xl border border-[#d8dee9] hover:bg-[#2e3440] hover:text-white transition-all duration-300 group">
                  <span className="font-bold text-[#4c566a] group-hover:text-white">{a.title}</span>
                  <ArrowRight size={16} className="text-[#88c0d0]" />
                </Link>
              ))
            ) : (
              <div className="py-10 text-center border-2 border-dashed border-[#eceff4] rounded-3xl">
                <p className="text-sm opacity-50 italic text-[#4c566a]">No Assigments issued for this sector.</p>
              </div>
            )}
          </div>
        </div>

       
        <div className="bg-white rounded-[2.5rem] p-8 border border-[#d8dee9] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-8">
            <Users className="text-[#88c0d0]" />
            <h3 className="font-black text-[#2e3440] uppercase tracking-tight text-xl">Active Class</h3>
          </div>

          <div className="flex gap-2 mb-6">
            <select
              className="select select-bordered w-full rounded-2xl bg-[#eceff4] border-none text-sm font-bold focus:ring-2 focus:ring-[#88c0d0]"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">Add Student to Class</option>
              {availableStudents.map(student => (
                <option key={student._id} value={student._id}>{student.username}</option>
              ))}
            </select>
            <button 
              disabled={!selectedStudent}
              onClick={handleAddStudent}
              className="btn bg-[#88c0d0] hover:bg-[#81a1c1] text-white border-none rounded-2xl disabled:opacity-30"
            >
              <UserPlus size={18} />
            </button>
          </div>

          <div className="space-y-2 max-h-75 overflow-y-auto pr-2">
            {classStudents.length > 0 ? (
              classStudents.map(student => (
                <div key={student._id} className="flex items-center justify-between p-3 pl-5 rounded-2xl bg-[#f8fafc] border border-transparent hover:border-[#d8dee9] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#a3be8c] animate-pulse"></div>
                    <span className="text-sm font-bold text-[#4c566a]">{student.username}</span>
                  </div>
                  <button 
                    onClick={() => handleRemoveStudent(student._id)}
                    className="btn btn-ghost btn-xs text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm opacity-50 text-center py-6 italic text-[#4c566a]">Class is currently unoccupied.</p>
            )}
          </div>
        </div>
      </div>

            {/* popup to confirm delete */}
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
                  Confirm Deletion
                </h3>
                <p className="text-[#d8dee9] opacity-70 leading-relaxed">
                  You are about to delete <span className="text-[#88c0d0] font-bold">{cls.className}</span>. 
                  This will remove all associated students and coursework data. This action cannot be undone.
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

export default ClassDetails;