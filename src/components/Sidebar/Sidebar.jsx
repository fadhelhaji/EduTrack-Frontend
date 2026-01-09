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
  BookOpen, 
  UploadCloud, 
  BarChart3 
} from "lucide-react";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (!user) return null;

  
  const links = user.role === "Instructor" 
    ? [
        { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
        { name: "My Classes", path: "/class", icon: <School size={20} /> },
        { name: "Create Class", path: "/class/new", icon: <PlusCircle size={20} /> },
        { name: "My Assignments", path: "/assignment", icon: <FileText size={20} /> },
        { name: "Create Assignment", path: "/assignment/new", icon: <PenTool size={20} /> },
        { name: "All Submissions", path: "/submissions", icon: <Inbox size={20} /> },
      ]
    : [
        { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
        { name: "Available Work", path: "/submissions", icon: <BookOpen size={20} /> },
        { name: "Submit Work", path: "/submissions/new", icon: <UploadCloud size={20} /> },
        { name: "My Progress", path: "/my-submissions", icon: <BarChart3 size={20} /> },
      ];

  return (
   <div className="w-72 h-full bg-[#2e3440] flex flex-col p-6 border-r border-white/5">
      <div className="mb-10 px-2">
        <h2 className="text-[10px] font-black text-[#88c0d0] uppercase tracking-[0.3em] opacity-50">
          Main Menu
        </h2>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? "bg-[#88c0d0] text-[#2e3440] shadow-lg shadow-[#88c0d0]/20" 
                  : "text-[#d8dee9]/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className={isActive ? "text-[#2e3440]" : "text-[#88c0d0]"}>
                {link.icon}
              </span>
              <span className="font-bold text-sm tracking-tight">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-3 border border-white/5">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-[#81a1c1] text-[#2e3440] flex items-center justify-center font-black">
            {user.username?.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">{user.username}</p>
            <p className="text-[10px] font-black text-[#88c0d0] uppercase tracking-tighter opacity-70">
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;