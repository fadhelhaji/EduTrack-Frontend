import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../components/Contexts/UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="w-full bg-[#2e3440] border-b border-white/5 px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 group transition-opacity hover:opacity-80">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="w-9 h-9 fill-[#88c0d0]"
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
          <div className="dropdown dropdown-end">
            <div 
              tabIndex={0} 
              role="button" 
              className="w-10 h-10 flex items-center justify-center bg-[#88c0d0] text-[#2e3440] rounded-full font-bold text-sm border-2 border-[#88c0d0]/30 hover:border-[#88c0d0] hover:scale-105 transition-all"
            >
              {user.username?.charAt(0).toUpperCase()}
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 p-3 shadow-2xl bg-[#3b4252] rounded-box w-60 border border-white/10 text-[#d8dee9]">
              <li className="px-4 py-2 border-b border-white/5 mb-2">
                <p className="font-bold text-white">{user.username}</p>
                <p className="text-xs text-[#88c0d0] font-bold uppercase tracking-widest">{user.role}</p>
              </li>
              <li>
                <Link to="/profile" className="font-bold py-2">My Profile</Link>
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
              className="btn bg-[#88c0d0] hover:bg-[#81a1c1] text-[#2e3440] border-none btn-md rounded-full px-8 font-bold hover:scale-105 transition-transform"
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