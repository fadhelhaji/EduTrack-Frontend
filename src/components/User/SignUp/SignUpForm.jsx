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
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  }

  function isFormInvalid() {
    const { username, password, confirmPassword } = formData;
    return !(username && password && password === confirmPassword);
  }

  return (
    <main className="min-h-screen bg-[#eceff4] flex items-center justify-center p-6 py-12">
      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#d8dee9]">
        
        <div className="md:w-1/3 bg-[#2e3440] p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-[#88c0d0] rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#b48ead] rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-[#88c0d0] text-sm font-black tracking-[0.4em] uppercase mb-4">Join Us</h2>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-6">Create Account</h1>
            <p className="text-[#d8dee9]/70 leading-relaxed font-medium">
              Start your journey with EduTrack. Choose your role to get access to specialized academic tools.
            </p>
          </div>

          <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
            <p className="text-xs text-[#d8dee9]/50 font-bold uppercase tracking-widest">
              Already have an account?
            </p>
            <button onClick={() => navigate('/auth/sign-in')} className="mt-2 text-[#88c0d0] hover:text-white transition-colors font-black text-sm uppercase tracking-wider">
              Sign In Instead
            </button>
          </div>
        </div>

        <div className="md:w-2/3 p-10 md:p-16 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-black text-[#4c566a] uppercase tracking-widest text-[10px]">Your Role</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl focus:border-[#88c0d0] font-medium text-[#2e3440]"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Student">Student</option>
                </select>
              </div>

              {formData.role === "Instructor" && (
                <div className="form-control md:col-span-2 animate-fadeIn">
                  <label className="label" htmlFor="employeeId">
                    <span className="label-text font-black text-[#5e81ac] uppercase tracking-widest text-[10px]">Employee ID</span>
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-[#f8fafc] border-[#5e81ac]/30 rounded-xl focus:border-[#5e81ac] font-medium"
                    placeholder="Enter your Employee ID"
                    required
                  />
                </div>
              )}

              <div className="form-control md:col-span-2">
                <label className="label" htmlFor="username">
                  <span className="label-text font-black text-[#4c566a] uppercase tracking-widest text-[10px]">Username</span>
                </label>
                <input
                  value={formData.username}
                  onChange={handleChange}
                  name="username"
                  id="username"
                  type="text"
                  className="input input-bordered w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl focus:border-[#88c0d0] font-medium"
                  placeholder="Enter your Username"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label" htmlFor="firstName">
                  <span className="label-text font-black text-[#4c566a] uppercase tracking-widest text-[10px]">First Name</span>
                </label>
                <input
                  value={formData.firstName}
                  onChange={handleChange}
                  name="firstName"
                  id="firstName"
                  type="text"
                  className="input input-bordered w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl focus:border-[#88c0d0] font-medium"
                  placeholder="Enter your First Name"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label" htmlFor="lastName">
                  <span className="label-text font-black text-[#4c566a] uppercase tracking-widest text-[10px]">Last Name</span>
                </label>
                <input
                  value={formData.lastName}
                  onChange={handleChange}
                  name="lastName"
                  id="lastName"
                  type="text"
                  className="input input-bordered w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl focus:border-[#88c0d0] font-medium"
                  placeholder=" Enter your Last Name"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text font-black text-[#4c566a] uppercase tracking-widest text-[10px]">Password</span>
                </label>
                <input
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  id="password"
                  type="password"
                  className="input input-bordered w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl focus:border-[#88c0d0] font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label" htmlFor="confirmPassword">
                  <span className="label-text font-black text-[#4c566a] uppercase tracking-widest text-[10px]">Confirm Password</span>
                </label>
                <input
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  className="input input-bordered w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl focus:border-[#88c0d0] font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="pt-8">
              <button 
                disabled={isFormInvalid()} 
                type="submit" 
                className={`btn btn-block h-14 rounded-xl font-black uppercase tracking-widest transition-all border-none shadow-lg
                  ${isFormInvalid() 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#2e3440] hover:bg-[#3b4252] text-white shadow-gray-200'}`}
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default SignUpForm;