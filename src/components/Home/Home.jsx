import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../components/Contexts/UserContext';
import * as assignmentService from '../../services/assignmentService';
import * as classService from '../../services/classService';
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
  ChevronRight,
  User,
  BookOpen
} from "lucide-react";

const studentQuotes = [
  "The best way to predict the future is to code it.",
  "System ready. Focus on your active missions and deliver excellence.",
  "Consistency is the silent engine of professional growth.",
  "Code is poetry; may your logic be flawless today.",
  "High-performance individuals are built through daily discipline."
];

const instructorQuotes = [
  "Leadership is about enabling others to exceed their own expectations.",
  "Great teachers engineer learning environments, not just lectures.",
  "Quality feedback is the most powerful tool in a developer's kit.",
  "Your classroom is the laboratory for the next generation of tech.",
  "Structure the logic, inspire the mind."
];

const Home = () => {
  const { user } = useContext(UserContext);
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [memo, setMemo] = useState("");

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        if (user.role === "Student") {
          const assignData = await assignmentService.myAssignments();
          setAssignments(assignData || []);
        } else {
          const classData = await classService.index();
          setClasses(classData.classes || classData || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchHomeData();
      const quotes = user.role === "Student" ? studentQuotes : instructorQuotes;
      setMemo(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-ring loading-lg text-[#88c0d0]"></span>
      </div>
    );
  }

  const isStudent = user.role === "Student";

  const instructorActions = [
    { name: "Add Class", path: "/class/new", icon: <PlusCircle size={18}/>, color: "hover:border-[#88c0d0]" },
    { name: "Manage Classes", path: "/class", icon: <School size={18}/>, color: "hover:border-[#81a1c1]" },
    { name: "Add Assignment", path: "/assignment/new", icon: <FileText size={18}/>, color: "hover:border-[#a3be8c]" },
    { name: "View Work", path: "/submissions", icon: <Inbox size={18}/>, color: "hover:border-[#ebcb8b]" },
  ];

  const studentActions = [
    { name: "Assignment", path: "/my-assignment", icon: <Compass size={18}/>, color: "hover:border-[#88c0d0]" },
    { name: "Submission", path: "/my-submissions", icon: <Inbox size={18}/>, color: "hover:border-[#81a1c1]" },
  ];

  const actions = isStudent ? studentActions : instructorActions;

  const tileContent = ({ date, view }) => {
    if (view === 'month' && isStudent) {
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
      <div className="w-full max-w-5xl mx-auto space-y-6">
        {children}
      </div>
    </div>
  );

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
                <span className="text-[7px] font-black text-[#88c0d0] tracking-[0.3em] uppercase">
                  {isStudent ? 'Student Command' : 'Instructor Control'}
                </span>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
                Welcome, <span className="animate-shine">{user.firstName}</span>
              </h1>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-3">
            {actions.map((action, idx) => (
              <Link key={idx} to={action.path} className={`group flex items-center justify-between bg-white border border-[#d8dee9] p-4 rounded-3xl transition-all hover:bg-[#2e3440] ${action.color} shadow-sm hover:-translate-y-1`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#eceff4] text-[#2e3440] rounded-lg flex items-center justify-center group-hover:bg-[#88c0d0] transition-colors">{action.icon}</div>
                  <h3 className="font-black uppercase tracking-tighter text-[10px] group-hover:text-white transition-colors">{action.name}</h3>
                </div>
                <ArrowUpRight className="text-[#d8dee9] group-hover:text-[#88c0d0] transition-transform" size={14} />
              </Link>
            ))}
          </div>

          <section className="bg-white border border-[#d8dee9] rounded-4xl p-5">
            <h4 className="text-[8px] font-black uppercase tracking-[0.2em] text-[#81a1c1] mb-4 flex items-center gap-2">
              {isStudent ? <><Clock size={12}/> Assignments</> : <><School size={12}/> Managed Classes</>}
            </h4>
            <div className="space-y-2">
              {isStudent ? (
                assignments.length > 0 ? assignments.slice(0, 3).map((a) => (
                  <Link to={`/submissions/new?assignmentId=${a._id}`} key={a._id} className="group flex items-center justify-between p-3 bg-[#f8fafc] rounded-2xl border border-transparent hover:border-[#88c0d0] hover:bg-white transition-all">
                    <span className="text-[11px] font-black uppercase text-[#2e3440]">{a.title}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[8px] font-bold text-[#bf616a] uppercase">Due: {new Date(a.deadline).toLocaleDateString("en-GB")}</span>
                      <ChevronRight size={12} className="text-[#d8dee9] group-hover:text-[#2e3440] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                )) : <p className="text-center py-4 text-[9px] font-bold text-[#4c566a] opacity-40 uppercase italic">No active Assignments.</p>
              ) : (
                classes.length > 0 ? classes.slice(0, 3).map((c) => (
                  <Link to={`/class/${c._id}`} key={c._id} className="group flex items-center justify-between p-3 bg-[#f8fafc] rounded-2xl border border-transparent hover:border-[#81a1c1] hover:bg-white transition-all">
                    <span className="text-[11px] font-black uppercase text-[#2e3440]">{c.className}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[8px] font-bold text-[#81a1c1] uppercase">{c.program}</span>
                      <ChevronRight size={12} className="text-[#d8dee9] group-hover:text-[#2e3440] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                )) : <p className="text-center py-4 text-[9px] font-bold text-[#4c566a] opacity-40 uppercase italic">No classes created.</p>
              )}
            </div>
          </section>
        </div>

        <div className="lg:col-span-5 space-y-5">
          <section className="bg-linear-to-br from-[#88c0d0] to-[#81a1c1] rounded-4xl p-6 text-[#2e3440] shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
              {isStudent ? <User size={80} strokeWidth={1} /> : <BookOpen size={80} strokeWidth={1} />}
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="px-2 py-0.5 bg-[#2e3440] text-white text-[7px] font-black uppercase tracking-widest rounded-full">
                  {isStudent ? 'Student ID' : 'Faculty ID'}
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Verified {user.role}</p>
              <h2 className="text-2xl font-black uppercase tracking-tighter leading-none mb-1">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-[10px] font-bold opacity-80 mb-4">{user.username}</p>
              <div className="flex gap-4 pt-2 border-t border-[#2e3440]/10">
                <div>
                  <p className="text-[7px] font-black uppercase opacity-60">Auth Level</p>
                  <p className="text-[9px] font-bold uppercase tracking-tight">{user.role}</p>
                </div>
                {!isStudent && (
                  <div>
                    <p className="text-[7px] font-black uppercase opacity-60">Total Classes</p>
                    <p className="text-[9px] font-bold uppercase tracking-tight">{classes?.length || 0}</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="bg-white border-2 border-[#88c0d0] rounded-4xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#88c0d0]/5 rounded-bl-full"></div>
            <h4 className="text-[8px] font-black uppercase tracking-[0.2em] text-[#88c0d0] mb-3 flex items-center gap-2">
              <Terminal size={12}/> {isStudent ? 'Mission Briefing' : 'Faculty Memo'}
            </h4>
            <div className="space-y-3">
              <p className="text-[11px] font-bold text-[#2e3440] leading-relaxed italic animate-in fade-in slide-in-from-left-2 duration-1000">
                "{memo}"
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-[#eceff4]">
                <div className="w-1 h-4 bg-[#88c0d0] rounded-full"></div>
                <span className="text-[8px] font-black uppercase text-[#4c566a] tracking-widest">System Status: Optimal</span>
              </div>
            </div>
          </section>

          <section className="bg-[#2e3440] rounded-4xl p-5 shadow-lg border border-white/5 text-white">
            <h4 className="text-[8px] font-black uppercase tracking-[0.2em] text-[#88c0d0] mb-3 flex items-center gap-2">
              <CalendarIcon size={12}/> Academic Schedule
            </h4>
            <div className="nord-calendar-compact">
              <Calendar 
                className="bg-transparent border-none text-white w-full"
                tileContent={tileContent}
                formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
              />
            </div>
          </section>
        </div>
      </div>
      <footer className="flex justify-center gap-6 text-[7px] font-black text-[#4c566a] uppercase tracking-[0.4em] opacity-30 pt-4">
        <div className="flex items-center gap-1"><Zap size={10} className="animate-pulse" /> Encryption Active</div>
        <div className="flex items-center gap-1"><Activity size={10} className="text-green-500" /> Server EduTrack Online</div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .react-calendar { background: transparent !important; color: white !important; font-family: inherit; border: none !important; width: 100% !important; font-size: 10px; }
        .react-calendar__navigation button { color: white !important; font-weight: 900; text-transform: uppercase; font-size: 8px; }
        .react-calendar__tile { color: #d8dee9 !important; font-size: 10px; padding: 8px 0 !important; }
        .react-calendar__tile--now { background: #4c566a !important; border-radius: 8px; }
        .react-calendar__tile--active { background: #88c0d0 !important; border-radius: 8px; color: #2e3440 !important; }
      `}} />
    </PageWrapper>
  );
};

export default Home;