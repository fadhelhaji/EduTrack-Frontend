import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import * as authService from "../../../services/authService";
import { UserContext } from "../../Contexts/UserContext";

function SignUpForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    role: "",
    employeeId: "",
    email: ""
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
<main className="min-h-[85vh] flex items-center justify-center p-4 bg-[#eceff4]">
      <div className="max-w-4xl w-full bg-white rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row border border-[#d8dee9] overflow-hidden">
        
        <div className="md:w-1/3 bg-[#2e3440] p-8 flex flex-col justify-center relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-5 left-5 w-24 h-24 bg-[#88c0d0] rounded-full blur-3xl"></div>
            <div className="absolute bottom-5 right-5 w-24 h-24 bg-[#b48ead] rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-[#88c0d0] text-[9px] font-black tracking-[0.4em] uppercase mb-2">Join Us</h2>
            <h1 className="text-3xl font-black text-white tracking-tighter mb-4 leading-none uppercase">Create Account</h1>
            <p className="text-[#d8dee9]/70 text-xs leading-relaxed font-medium">
              Start your journey with EduTrack. Access specialized academic tools.
            </p>
          </div>

          <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
            <p className="text-[10px] text-[#d8dee9]/50 font-bold uppercase tracking-widest">
              Already have an account?
            </p>
            <button onClick={() => navigate('/auth/sign-in')} className="mt-2 text-[#88c0d0] hover:text-white transition-colors font-black text-[10px] uppercase tracking-wider">
              Sign In Instead
            </button>
          </div>
        </div>

        <div className="md:w-2/3 p-8 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              
              <div className="form-control md:col-span-2">
                <label className="label py-0" htmlFor="role">
                  <span className="label-text font-black text-[#81a1c1] uppercase tracking-widest text-[9px]">Your Role</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="select select-bordered select-sm h-10 w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl text-xs"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Student">Student</option>
                </select>
              </div>

              {formData.role === "Instructor" && (
                <div className="form-control md:col-span-2">
                  <label className="label py-0" htmlFor="employeeId">
                    <span className="label-text font-black text-[#5e81ac] uppercase tracking-widest text-[9px]">Employee ID</span>
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className="input input-bordered input-sm h-10 w-full bg-[#f8fafc] border-[#5e81ac]/30 rounded-xl text-xs"
                    placeholder="ID Number"
                    required
                  />
                </div>
              )}

              <div className="form-control md:col-span-2">
                <label className="label py-0" htmlFor="username">
                  <span className="label-text font-black text-[#81a1c1] uppercase tracking-widest text-[9px]">Username</span>
                </label>
                <input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  placeholder="Username"
                  className="input input-bordered input-sm h-10 w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label py-0" htmlFor="email">
                  <span className="label-text font-black text-[#81a1c1] uppercase tracking-widest text-[9px]">Email</span>
                </label>
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="text"
                  placeholder="Email"
                  className="input input-bordered input-sm h-10 w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label py-0" htmlFor="firstName">
                  <span className="label-text font-black text-[#81a1c1] uppercase tracking-widest text-[9px]">First Name</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered input-sm h-10 w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label py-0" htmlFor="lastName">
                  <span className="label-text font-black text-[#81a1c1] uppercase tracking-widest text-[9px]">Last Name</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered input-sm h-10 w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label py-0" htmlFor="password">
                  <span className="label-text font-black text-[#81a1c1] uppercase tracking-widest text-[9px]">Password</span>
                </label>
                <input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered input-sm h-10 w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label py-0" htmlFor="confirmPassword">
                  <span className="label-text font-black text-[#81a1c1] uppercase tracking-widest text-[9px]">Confirm Password</span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered input-sm h-10 w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                disabled={isFormInvalid()} 
                type="submit" 
                className={`btn btn-block h-12 rounded-xl font-black uppercase tracking-widest text-[11px] border-none transition-all
                  ${isFormInvalid() ? 'bg-gray-200 text-gray-400' : 'bg-[#2e3440] text-white hover:bg-[#3b4252]'}`}
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