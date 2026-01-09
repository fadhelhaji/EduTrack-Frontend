import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../components/Contexts/UserContext';
import * as testService from '../../services/testService';
import * as assignmentService from '../../services/assignmentService';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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
  FileText,
  Calendar as CalendarIcon,
  Clock
} from "lucide-react";

const Home = () => {
  const { user } = useContext(UserContext);
  const [ message, setMessage ] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchTest = async () => {
  //     try {
  //       const data = await testService.test();
  //       setMessage(data.message);
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   if (user) fetchTest();
  // }, [user]);
    useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const assignData = await assignmentService.myAssignments();
        setAssignments(assignData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user && user.role === "Student") fetchHomeData();
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

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const hasAssignment = assignments.some(a => 
        new Date(a.deadline).toDateString() === date.toDateString()
      );
      return hasAssignment ? (
        <div className="flex justify-center mt-1">
          <div className="w-1.5 h-1.5 bg-[#bf616a] rounded-full animate-pulse"></div>
        </div>
      ) : null;
    }
  };


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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="relative overflow-hidden bg-[#2e3440] rounded-[2.5rem] p-10 shadow-xl border border-white/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#88c0d0]/5 rounded-bl-full blur-3xl"></div>
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#88c0d0]/10 border border-[#88c0d0]/20">
                <span className="text-[8px] font-black text-[#88c0d0] tracking-[0.3em] uppercase">Status: Active</span>
              </div>
              <h1 className="text-4xl md:text-4xl font-black text-white tracking-tighter leading-none uppercase">
                Welcome, <span className="text-[#88c0d0]">{user.username}</span>
              </h1>
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {studentActions.map((action, idx) => (
              <Link key={idx} to={action.path} className={`group flex items-center justify-between bg-white border border-[#d8dee9] p-6 rounded-4xl transition-all hover:bg-[#2e3440] ${action.color} shadow-sm`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#eceff4] text-[#2e3440] rounded-2xl flex items-center justify-center group-hover:bg-[#88c0d0] transition-colors">{action.icon}</div>
                  <h3 className="font-black uppercase tracking-tighter text-md group-hover:text-white transition-colors">{action.name}</h3>
                </div>
                <ArrowUpRight className="text-[#d8dee9] group-hover:text-[#88c0d0]" size={20} />
              </Link>
            ))}
          </div>

          <section className="bg-white border border-[#d8dee9] rounded-4xl p-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#81a1c1] mb-6 flex items-center gap-2">
              <Clock size={14}/> Recent Assignments
            </h4>
            <div className="space-y-3">
              {assignments.slice(0, 3).map((a) => (
                <div key={a._id} className="flex items-center justify-between p-4 bg-[#eceff4]/50 rounded-2xl border border-transparent hover:border-[#d8dee9] transition-all">
                  <span className="text-xs font-black uppercase text-[#2e3440]">{a.title}</span>
                  <span className="text-[10px] font-bold text-[#bf616a] uppercase">Due: {new Date(a.deadline).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-[#2e3440] rounded-[2.5rem] p-6 shadow-xl border border-white/5 text-white">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#88c0d0] mb-6 flex items-center gap-2">
              <CalendarIcon size={14}/> Calander Timeline
            </h4>
            <div className="nord-calendar-wrapper">
              <Calendar 
                className="bg-transparent border-none text-white w-full"
                tileContent={tileContent}
                formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
              />
            </div>
          </section>

          <section className="bg-white border border-[#d8dee9] rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#eceff4] flex items-center justify-center text-[#81a1c1]"><Layers size={18}/></div>
              <div>
                <p className="text-[8px] font-black uppercase text-[#81a1c1] tracking-widest">Step 01</p>
                <p className="text-[11px] font-black uppercase text-[#2e3440]">Select Assignment</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#eceff4] flex items-center justify-center text-[#a3be8c]"><FileCode2 size={18}/></div>
              <div>
                <p className="text-[8px] font-black uppercase text-[#a3be8c] tracking-widest">Step 02</p>
                <p className="text-[11px] font-black uppercase text-[#2e3440]">Deploy Source</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#eceff4] flex items-center justify-center text-[#b48ead]"><CheckCircle size={18}/></div>
              <div>
                <p className="text-[8px] font-black uppercase text-[#b48ead] tracking-widest">Step 03</p>
                <p className="text-[11px] font-black uppercase text-[#2e3440]">Await Feedback</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="flex justify-center gap-8 text-[8px] font-black text-[#4c566a] uppercase tracking-[0.4em] opacity-40 py-10">
        <div className="flex items-center gap-2"><Zap size={10} /> Sync Stable</div>
        <div className="flex items-center gap-2"><Activity size={10} /> Active</div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .react-calendar { background: transparent !important; color: white !important; font-family: inherit; border: none !important; }
        .react-calendar__navigation button { color: white !important; font-weight: 900; text-transform: uppercase; font-size: 10px; }
        .react-calendar__month-view__weekdays__weekday { font-size: 10px; font-weight: 900; color: #81a1c1 !important; text-decoration: none !important; }
        .react-calendar__tile { color: #d8dee9 !important; font-size: 12px; font-weight: bold; padding: 12px 0 !important; }
        .react-calendar__tile--now { background: #4c566a !important; border-radius: 12px; color: white !important; }
        .react-calendar__tile--active { background: #88c0d0 !important; border-radius: 12px; color: #2e3440 !important; }
        .react-calendar__tile:hover { background: #3b4252 !important; border-radius: 12px; }
      `}} />
    </PageWrapper>
  );
};

export default Home;