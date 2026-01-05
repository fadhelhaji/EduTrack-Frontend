import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../components/Contexts/UserContext"; // adjust path if needed

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav>
      <ul>
        {/* Always visible links */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/class">Class List</Link></li>

        {user ? (
          <>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/class/new">Create Class</Link></li>
            <li>Welcome, {user.username}</li>
            <li>
              <Link to="/" onClick={handleSignOut}>
                Sign Out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/auth/sign-in">Sign In</Link></li>
            <li><Link to="/auth/sign-up">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
