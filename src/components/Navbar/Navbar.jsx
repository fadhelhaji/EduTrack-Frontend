import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../Contexts/UserContext";

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <nav>
      {/* Always visible links */}
      <Link to="/">Home</Link>
      <Link to="/class">Class List</Link>

      {user ? (
        <>
          <Link to="/class/new">Create Class</Link>
          <span>Welcome, {user.username}</span>
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <Link to="/sign-up">Sign Up</Link>
      )}
    </nav>
  );
}

export default Navbar;
