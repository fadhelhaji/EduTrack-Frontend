import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../components/Contexts/UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {user?.role === "Instructor" && (
          <>
            <li>
              <Link to="/class">My Classes</Link>
            </li>
            <li>
              <Link to="/class/new">Create Class</Link>
            </li>
            <li>
              <Link to="/assignment/new">Create Assignment</Link>
            </li>
            <li>
               <Link to="/assignment"> My Assignments</Link>
            </li>
            <li>
              <Link to="/submissions">All Submissions</Link>
            </li>
          </>
        )}

        {user ? (
          <>
            <li>Welcome, {user.username}</li>
            <li>
              <Link to="/" onClick={handleSignOut}>
                Sign Out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/auth/sign-in">Sign In</Link>
            </li>
            <li>
              <Link to="/auth/sign-up">Sign Up</Link>
            </li>
          </>
        )}
        {user?.role === "Student" && (
  <li>
    <Link to="/my-submissions">My Submissions</Link>
  </li>
)}

      </ul>
    </nav>
  );
};

export default Navbar;
