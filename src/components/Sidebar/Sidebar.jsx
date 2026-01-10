import { Link, useLocation } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../components/Contexts/UserContext";
import { 
  LayoutDashboard, 
  School, 
  PlusCircle, 
  FileText, 
  PenTool, 
  Inbox, 
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (!user) return null;

  const links = user.role === "Instructor" 
    ? [
        { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
        { name: "My Classes", path: "/class", icon: <School size={20} /> },
        { name: "Create Class", path: "/class/new", icon: <PlusCircle size={20} /> },
        { name: "Assignments", path: "/assignment", icon: <FileText size={20} /> },
        { name: "Create Assignment", path: "/assignment/new", icon: <PenTool size={20} /> },
        { name: "Submission Queue", path: "/submissions", icon: <Inbox size={20} /> },
      ]
    : [
        { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
        { name: "Coursework", path: "/my-assignment", icon: <FileText size={20} /> },
        { name: "My Submissions", path: "/my-submissions", icon: <Inbox size={20} /> },    
      ];

  return (
    <div className="h-full bg-[#2e3440] border-r border-white/5 flex flex-col relative min-h-[calc(100vh-64px)]">
      <button 
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-[#88c0d0] text-[#2e3440] rounded-full p-1 border-4 border-[#eceff4] z-50 hover:scale-110 transition-transform cursor-pointer"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className="flex-1 p-4">
        <nav className="space-y-2 mt-4">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-4 rounded-2xl transition-all duration-300 group ${
                  isCollapsed ? "justify-center p-3" : "px-4 py-3"
                } ${
                  isActive 
                    ? "bg-[#88c0d0] text-[#2e3440] shadow-lg shadow-[#88c0d0]/20" 
                    : "text-[#d8dee9] hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={isActive ? "text-[#2e3440]" : "text-[#88c0d0]"}>
                  {link.icon}
                </span>
                {!isCollapsed && (
                  <span className="font-black text-[11px] uppercase tracking-widest">{link.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/5 bg-[#2e3440] sticky bottom-0">
        <div className={`bg-white/5 rounded-2xl flex items-center border border-white/5 ${isCollapsed ? "justify-center p-2" : "gap-3 p-3"}`}>
          <div className="w-8 h-8 shrink-0 rounded-lg bg-[#81a1c1] text-[#2e3440] flex items-center justify-center font-black text-xs uppercase">
            {user.username?.charAt(0)}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-[10px] font-black text-white uppercase truncate">{user.username}</p>
              <p className="text-[9px] font-bold text-[#88c0d0] uppercase tracking-tighter">{user.role}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;