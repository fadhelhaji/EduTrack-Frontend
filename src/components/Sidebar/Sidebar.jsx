import { Link, useLocation } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../components/Contexts/UserContext";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (!user) return null;

  const links = user.role === "Instructor" 
    ? [
        { name: "Dashboard", path: "/", icon: "📊" },
        { name: "My Classes", path: "/class", icon: "🏫" },
        { name: "Assignments", path: "/assignment", icon: "📝" },
        { name: "Submissions", path: "/submissions", icon: "📥" },
      ]
    : [
        { name: "Dashboard", path: "/", icon: "🏠" },
        { name: "My Progress", path: "/my-submissions", icon: "📈" },
        { name: "Assignments", path: "/assignment", icon: "📖" },
        { name: "Submit Work", path: "/submissions/new", icon: "📤" },
      ];

  return (
    <aside className="fixed left-0 top-20 w-64 h-[calc(100vh-5rem)] bg-[#2e3440] text-[#d8dee9] z-40 border-r border-white/5 shadow-2xl overflow-y-auto">
      <div className="flex flex-col h-full py-6 px-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#88c0d0] font-bold px-4 mb-4 opacity-80">
            Workspace
          </p>
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-[#4c566a] text-white shadow-lg shadow-black/20" 
                    : "hover:bg-[#3b4252] text-[#d8dee9]/80 hover:text-white"
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-semibold text-sm">{link.name}</span>
              </Link>
            );
          })}
        </div>

        
        <div className="mt-auto p-4 bg-[#3b4252]/50 rounded-2xl border border-white/5">
          <p className="text-[10px] uppercase text-[#88c0d0] font-bold tracking-wider mb-1">Role</p>
          <p className="text-sm font-bold text-white">{user.role}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;