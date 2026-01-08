import { useContext } from "react";
import { Link , useNavigate  } from "react-router";
import { UserContext } from "../../components/Contexts/UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate('/')
  };

  return (
    <nav className="relative w-full z-100 bg-[#2e3440] border-b border-white/5 px-6 h-20 flex items-center justify-between">
      
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 group transition-opacity hover:opacity-80">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="w-9 h-9 fill-primary"
          >
            <path d="M12 2L1 9l11 7 9-5.73V17h2V9L12 2zm7 11.27l-7 4.45-7-4.45V15l7 4.5 7-4.5v-1.73z" />
          </svg>
          <span className="text-2xl font-black tracking-tighter text-white">
            EduTrack
          </span>
        </Link>
      </div>

      
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <div className="hidden md:flex">
              <ul className="flex items-center gap-8 font-semibold text-[#d8dee9]">
                <li>
                  <Link to="/class" className="hover:text-primary transition-colors">My Classes</Link>
                </li>
                <li>
                  <Link to="/assignment" className="hover:text-primary transition-colors">Assignments</Link>
                </li>
                {user.role === "Instructor" ? (
                  <li>
                    <Link to="/submissions" className="hover:text-primary transition-colors">Submissions</Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/submissions" className="hover:text-primary transition-colors">My Progress</Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="dropdown dropdown-end">
              <div 
                tabIndex={0} 
                role="button" 
                className="w-10 h-10 flex items-center justify-center bg-primary text-primary-content rounded-full font-bold text-sm border-2 border-primary/30 hover:border-primary hover:scale-105 transition-all"
              >
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 p-3 shadow-2xl bg-[#3b4252] rounded-box w-60 border border-white/10 text-[#d8dee9]">
                <li className="px-4 py-2 border-b border-white/5 mb-2">
                  <p className="font-bold text-white">{user.username}</p>
                  <p className="text-xs text-primary">{user.role}</p>
                </li>
                <li>
                  <button 
                    onClick={handleSignOut} 
                    className="text-error font-bold mt-2 hover:bg-error/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="flex gap-4">
            <Link 
              to="/auth/sign-in" 
              className="font-bold text-[#d8dee9] flex items-center hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/auth/sign-up" 
              className="btn btn-primary btn-md rounded-full px-8 font-bold hover:scale-105 transition-transform"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
