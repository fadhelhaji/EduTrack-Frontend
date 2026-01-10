import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../components/Contexts/UserContext';
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
  PlusCircle,
  School,
  FileText,
  Calendar as CalendarIcon,
  Clock,
  Terminal,
  ChevronRight
} from "lucide-react";

const Home = () => {
  const { user } = useContext(UserContext);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

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
    { name: "Add Class", path: "/class/new", icon: <PlusCircle size={20}/>, desc: "New student roster", color: "hover:border-[#88c0d0]" },
    { name: "Manage Classes", path: "/class", icon: <School size={20}/>, desc: "Monitor groups", color: "hover:border-[#81a1c1]" },
    { name: "Add Assignment", path: "/assignment/new", icon: <FileText size={20}/>, desc: "Deploy tasks", color: "hover:border-[#a3be8c]" },
    { name: "View Work", path: "/submissions", icon: <Inbox size={20}/>, desc: "Review work", color: "hover:border-[#ebcb8b]" },
  ];

  const studentActions = [
    { name: "Assignment", path: "/my-assignment", icon: <Compass size={18}/>, color: "hover:border-[#88c0d0]" },
    { name: "Submission", path: "/my-submissions", icon: <Inbox size={18}/>, color: "hover:border-[#81a1c1]" },
  ];

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const hasAssignment = assignments.some(a => 
        new Date(a.deadline).toDateString() === date.toDateString()
      );
      return hasAssignment ? (
        <div className="flex justify-center mt-1">
          <div className="w-1 h-1 bg-[#bf616a] rounded-full animate-pulse"></div>
        </div>
      ) : null;
    }
  };

  const PageWrapper = ({ children }) => (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto space-y-6">
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
              Your management suite is active. Oversee assignments and monitor student progress from this Dashboard.
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 space-y-5">
          <section className="relative overflow-hidden bg-[#2e3440] rounded-4xl p-6 shadow-lg border border-white/5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#88c0d0]/10 rounded-bl-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/5 overflow-hidden">
               <div className="w-1/3 h-full bg-[#88c0d0] animate-slide-infinite"></div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <Terminal size={10} className="text-[#88c0d0] animate-pulse" />
                <span className="text-[7px] font-black text-[#88c0d0] tracking-[0.3em] uppercase">Student Dashboard</span>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
                Welcome, <span className="animate-shine">{user.username}</span>
              </h1>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-3">
            {studentActions.map((action, idx) => (
              <Link key={idx} to={action.path} className={`group flex items-center justify-between bg-white border border-[#d8dee9] p-4 rounded-3xl transition-all hover:bg-[#2e3440] ${action.color} shadow-sm hover:-translate-y-1`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#eceff4] text-[#2e3440] rounded-lg flex items-center justify-center group-hover:bg-[#88c0d0] transition-colors">{action.icon}</div>
                  <h3 className="font-black uppercase tracking-tighter text-[10px] group-hover:text-white transition-colors">{action.name}</h3>
                </div>
                <ArrowUpRight className="text-[#d8dee9] group-hover:text-[#88c0d0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={14} />
              </Link>
            ))}
          </div>

          <section className="bg-white border border-[#d8dee9] rounded-4xl p-5">
            <h4 className="text-[8px] font-black uppercase tracking-[0.2em] text-[#81a1c1] mb-4 flex items-center gap-2">
              <Clock size={12}/> Assignments
            </h4>
            <div className="space-y-2">
              {assignments.length > 0 ? assignments.slice(0, 3).map((a) => (
                <Link to={`/submissions/new?assignmentId=${a._id}`} key={a._id} className="group flex items-center justify-between p-3 bg-[#f8fafc] rounded-2xl border border-transparent hover:border-[#88c0d0] hover:bg-white transition-all">
                  <span className="text-[11px] font-black uppercase text-[#2e3440]">{a.title}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] font-bold text-[#bf616a] uppercase">Due: {new Date(a.deadline).toLocaleDateString("en-GB")}</span>
                    <ChevronRight size={12} className="text-[#d8dee9] group-hover:text-[#2e3440] group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )) : (
                <p className="text-center py-4 text-[9px] font-bold text-[#4c566a] opacity-40 uppercase italic">No active missions.</p>
              )}
            </div>
          </section>
        </div>

        <div className="lg:col-span-5 space-y-5">
          <section className="bg-[#2e3440] rounded-4xl p-5 shadow-lg border border-white/5 text-white">
            <h4 className="text-[8px] font-black uppercase tracking-[0.2em] text-[#88c0d0] mb-3 flex items-center gap-2">
              <CalendarIcon size={12}/> Calendar
            </h4>
            <div className="nord-calendar-compact">
              <Calendar 
                className="bg-transparent border-none text-white w-full"
                tileContent={tileContent}
                formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
              />
            </div>
          </section>

          <section className="bg-[#88c0d0] rounded-4xl p-5 text-[#2e3440] flex items-center justify-between shadow-sm overflow-hidden relative group">
            <div className="absolute -right-2 -bottom-2 opacity-10 animate-float group-hover:scale-110 transition-transform">
              <Activity size={60} />
            </div>
            <div className="relative z-10">
              <h4 className="text-[7px] font-black uppercase tracking-widest mb-1">Network</h4>
              <p className="text-lg font-black uppercase tracking-tighter">Connected</p>
            </div>
            <Activity size={24} className="opacity-30 relative z-10" />
          </section>
        </div>
      </div>

      <footer className="flex justify-center gap-6 text-[7px] font-black text-[#4c566a] uppercase tracking-[0.4em] opacity-30 pt-4">
        <div className="flex items-center gap-1"><Zap size={10} className="animate-pulse" /> Sync Stable</div>
        <div className="flex items-center gap-1"><Activity size={10} className="text-green-500" /> Active</div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .react-calendar { background: transparent !important; color: white !important; font-family: inherit; border: none !important; width: 100% !important; font-size: 10px; }
        .react-calendar__navigation { margin-bottom: 5px; height: 25px; }
        .react-calendar__navigation button { color: white !important; font-weight: 900; text-transform: uppercase; font-size: 8px; min-width: 20px; }
        .react-calendar__month-view__weekdays__weekday { font-size: 7px; font-weight: 900; color: #81a1c1 !important; text-decoration: none !important; padding: 3px 0; }
        .react-calendar__tile { color: #d8dee9 !important; font-size: 10px; font-weight: bold; padding: 8px 0 !important; }
        .react-calendar__tile--now { background: #4c566a !important; border-radius: 8px; color: white !important; }
        .react-calendar__tile--active { background: #88c0d0 !important; border-radius: 8px; color: #2e3440 !important; }
      `}} />
    </PageWrapper>
  );
};

export default Home;