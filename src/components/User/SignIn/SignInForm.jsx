import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from '../../../services/authService';
import { UserContext } from '../../Contexts/UserContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="min-h-[80vh] bg-[#eceff4] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#d8dee9]">
        
        
        <div className="md:w-1/2 bg-[#2e3440] p-8 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-5 left-5 w-24 h-24 bg-[#88c0d0] rounded-full blur-3xl"></div>
            <div className="absolute bottom-5 right-5 w-24 h-24 bg-[#b48ead] rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-[#88c0d0] text-[10px] font-black tracking-[0.4em] uppercase mb-2">Welcome Back</h2>
            <h1 className="text-3xl font-black text-white tracking-tighter mb-4">EduTrack Portal</h1>
            <p className="text-[#d8dee9]/70 text-xs leading-relaxed font-medium max-w-xs">
              Access your centralized dashboard to manage classes and track submissions.
            </p>
          </div>
        </div>

        
        <div className="md:w-1/2 p-8 bg-white">
          <div className="mb-4">
            <h2 className="text-2xl font-black text-[#2e3440] tracking-tighter uppercase">Sign In</h2>
            <p className="text-[#4c566a] text-xs font-medium">Enter credentials to continue</p>
          </div>

          {message && (
            <div className="alert alert-error mb-4 bg-red-50 border-red-200 text-red-600 rounded-xl py-2 px-4">
              <span className="text-[10px] font-bold uppercase tracking-wide">{message}</span>
            </div>
          )}

          <form autoComplete="off" onSubmit={handleSubmit} className="space-y-3">
            <div className="form-control">
              <label className="label py-1" htmlFor="username">
                <span className="label-text font-black text-[#4c566a] uppercase tracking-widest text-[9px]">Username</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="off"
                className="input input-bordered h-10 w-full bg-[#f8fafc] border-[#d8dee9] rounded-lg focus:border-[#88c0d0] transition-all text-sm"
                placeholder="Username"
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1" htmlFor="password">
                <span className="label-text font-black text-[#4c566a] uppercase tracking-widest text-[9px]">Password</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
                className="input input-bordered h-10 w-full bg-[#f8fafc] border-[#d8dee9] rounded-lg focus:border-[#88c0d0] transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <button 
                type="submit" 
                className="btn bg-[#2e3440] hover:bg-[#3b4252] text-white border-none rounded-xl h-11 min-h-0 font-black uppercase tracking-widest text-xs shadow-md"
              >
                Sign In
              </button>
              <button 
                type="button"
                onClick={() => navigate('/')} 
                className="btn btn-ghost h-10 min-h-0 text-[#4c566a] hover:bg-[#eceff4] rounded-xl font-bold uppercase tracking-widest text-[10px]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignInForm;