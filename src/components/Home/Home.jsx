import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../components/Contexts/UserContext';
import * as testService from '../../services/testService';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Inbox, 
  ArrowUpRight,  
  Zap,
  Activity,
  Layers,
  FileCode2,
  CheckCircle,
  PlusCircle,
  School,
  FileText
} from "lucide-react";

const Home = () => {
  const { user } = useContext(UserContext);
  const [ message, setMessage ] = useState('');

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const data = await testService.test();
        setMessage(data.message);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchTest();
  }, [user]);

  const instructorActions = [
    { name: "Create Class", path: "/class/new", icon: <PlusCircle size={20}/>, desc: "New student roster", color: "hover:border-[#88c0d0]" },
    { name: "Manage Classes", path: "/class", icon: <School size={20}/>, desc: "Monitor groups", color: "hover:border-[#81a1c1]" },
    { name: "Add Assignment", path: "/assignment/new", icon: <FileText size={20}/>, desc: "Deploy tasks", color: "hover:border-[#a3be8c]" },
    { name: "Audit Work", path: "/submissions", icon: <Inbox size={20}/>, desc: "Review work", color: "hover:border-[#ebcb8b]" },
  ];

  const studentActions = [
    { name: "Assignments", path: "/assignment", icon: <Compass size={18}/>, color: "hover:border-[#88c0d0]" },
    { name: "My Submissions", path: "/my-submissions", icon: <Inbox size={18}/>, color: "hover:border-[#81a1c1]" },
  ];

  const PageWrapper = ({ children }) => (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {children}
      </div>
    </div>
  );

  if (user?.role === "Instructor") {
    return (
      <PageWrapper>
        <section className="relative overflow-hidden bg-[#2e3440] rounded-[2.5rem] p-10 shadow-xl border border-white/5 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#88c0d0]/10 rounded-full blur-3xl opacity-50"></div>
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-[#88c0d0] tracking-[0.3em] uppercase">
              Instructor Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
              Welcome, <span className="text-[#88c0d0]">{user.username}</span>
            </h1>
            <p className="text-[#d8dee9]/50 text-sm font-medium max-w-lg mx-auto leading-relaxed">
              Your management suite is active. Oversee assignments and monitor student progress from this terminal.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {instructorActions.map((action, idx) => (
            <Link key={idx} to={action.path} className={`group bg-white border border-[#d8dee9] p-6 rounded-4xl transition-all hover:bg-[#2e3440] ${action.color} shadow-sm`}>
              <div className="flex items-center gap-4 text-left">
                <div className="w-11 h-11 bg-[#eceff4] text-[#2e3440] rounded-xl flex items-center justify-center group-hover:bg-[#88c0d0] transition-colors shrink-0">
                  {action.icon}
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-tighter text-md group-hover:text-white transition-colors">{action.name}</h3>
                  <p className="text-[11px] text-[#4c566a] group-hover:text-[#d8dee9]/50 font-medium transition-colors">{action.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="flex flex-col items-center pt-4">
          <div className="flex items-center gap-6 bg-white px-6 py-2 rounded-full border border-[#d8dee9] shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-[#4c566a] uppercase tracking-widest">Online</span>
            </div>
            <div className="flex items-center gap-2 text-[#4c566a]/60">
              <Zap size={12} />
              <span className="text-[9px] font-black uppercase tracking-widest italic">Sync Stable</span>
            </div>
          </div>
        </footer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="relative overflow-hidden bg-[#2e3440] rounded-4xl p-8 shadow-xl border border-white/5">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#88c0d0]/10 rounded-bl-full blur-3xl"></div>
        <div className="relative z-10 space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#88c0d0]/10 border border-[#88c0d0]/20">
            <span className="text-[8px] font-black text-[#88c0d0] tracking-[0.3em] uppercase">Student Access</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
            Hello, <span className="animate-shine">{user.username}</span>
          </h1>
          <p className="text-[#d8dee9]/50 text-sm font-medium max-w-sm mx-auto md:mx-0">
            Access tasks and track your progress below.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {studentActions.map((action, idx) => (
          <Link key={idx} to={action.path} className={`group flex items-center justify-between bg-white border border-[#d8dee9] p-5 rounded-2xl transition-all hover:bg-[#2e3440] ${action.color} shadow-sm`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#eceff4] text-[#2e3440] rounded-xl flex items-center justify-center group-hover:bg-[#88c0d0] transition-colors">{action.icon}</div>
              <h3 className="font-black uppercase tracking-tighter text-sm group-hover:text-white transition-colors">{action.name}</h3>
            </div>
            <ArrowUpRight className="text-[#d8dee9] group-hover:text-[#88c0d0]" size={18} />
          </Link>
        ))}
      </div>

      <section className="bg-white border border-[#d8dee9] rounded-3xl p-4 flex flex-col md:flex-row items-center justify-around gap-4 text-[#4c566a]">
        <div className="flex items-center gap-3"><Layers size={14} className="text-[#81a1c1]"/><span className="text-[9px] font-bold uppercase tracking-widest">1. Select</span></div>
        <div className="flex items-center gap-3"><FileCode2 size={14} className="text-[#a3be8c]"/><span className="text-[9px] font-bold uppercase tracking-widest">2. Deploy</span></div>
        <div className="flex items-center gap-3"><CheckCircle size={14} className="text-[#b48ead]"/><span className="text-[9px] font-bold uppercase tracking-widest">3. Audit</span></div>
      </section>

      <footer className="flex justify-center gap-8 text-[8px] font-black text-[#4c566a] uppercase tracking-[0.4em] opacity-40">
        <div className="flex items-center gap-2"><Zap size={10} /> Live</div>
        <div className="flex items-center gap-2"><Activity size={10} /> Stable</div>
      </footer>
    </PageWrapper>
  );
};

export default Home;