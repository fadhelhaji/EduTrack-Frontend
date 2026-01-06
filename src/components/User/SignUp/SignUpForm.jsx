import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import * as authService from "../../../services/authService";
import { UserContext } from "../../Contexts/UserContext";

function SignUpForm() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    role: "",
    employeeId: "",
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const user = await authService.signUp(formData);
      setUser(user);
      navigate("/home");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  }

  function isFormInvalid() {
    const { username, password, confirmPassword } = formData;
    return !(username && password && password === confirmPassword);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="Instructor">Instructor</option>
          <option value="Student">Student</option>
        </select>

        {formData.role === "Instructor" && (
          <>
            <label htmlFor="employeeId">Employee ID</label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
            />
          </>
        )}

        <label htmlFor="username">Username</label>
        <input
          value={formData.username}
          onChange={handleChange}
          name="username"
          id="username"
          type="text"
          required
        />

        <label htmlFor="firstName">First Name</label>
        <input
          value={formData.firstName}
          onChange={handleChange}
          name="firstName"
          id="firstName"
          type="text"
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          value={formData.lastName}
          onChange={handleChange}
          name="lastName"
          id="lastName"
          type="text"
          required
        />


        <label htmlFor="password">Password</label>
        <input
          value={formData.password}
          onChange={handleChange}
          name="password"
          id="password"
          type="password"
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          value={formData.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          required
        />

        <button disabled={isFormInvalid()} type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
