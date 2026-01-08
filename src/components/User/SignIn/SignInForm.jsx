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
    <main className="min-h-screen bg-[#eceff4] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#d8dee9]">
        
        
        <div className="md:w-1/2 bg-[#2e3440] p-12 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-[#88c0d0] rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#b48ead] rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-[#88c0d0] text-sm font-black tracking-[0.4em] uppercase mb-4">Welcome Back</h2>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-6">EduTrack Portal</h1>
            <p className="text-[#d8dee9]/70 leading-relaxed font-medium">
              Access your centralized dashboard to manage classes, track GitHub submissions, and monitor academic progress.
            </p>
          </div>
        </div>

        
        <div className="md:w-1/2 p-12 bg-white">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-[#2e3440] tracking-tighter">Sign In</h2>
            <p className="text-[#4c566a] font-medium mt-2">Enter your credentials to continue</p>
          </div>

          {message && (
            <div className="alert alert-error mb-6 bg-red-50 border-red-200 text-red-600 rounded-2xl py-3 animate-shake">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-sm font-bold uppercase tracking-wide">{message}</span>
            </div>
          )}

          <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label" htmlFor="username">
                <span className="label-text font-black text-[#4c566a] uppercase tracking-widest text-[10px]">Username</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="off"
                className="input input-bordered w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl focus:border-[#88c0d0] focus:ring-2 focus:ring-[#88c0d0]/20 transition-all font-medium text-[#2e3440]"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text font-black text-[#4c566a] uppercase tracking-widest text-[10px]">Password</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
                className="input input-bordered w-full bg-[#f8fafc] border-[#d8dee9] rounded-xl focus:border-[#88c0d0] focus:ring-2 focus:ring-[#88c0d0]/20 transition-all font-medium text-[#2e3440]"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="pt-4 flex flex-col gap-4">
              <button 
                type="submit" 
                className="btn bg-[#2e3440] hover:bg-[#3b4252] text-white border-none rounded-xl h-14 font-black uppercase tracking-widest shadow-lg shadow-gray-200"
              >
                Sign In
              </button>
              <button 
                type="button"
                onClick={() => navigate('/')} 
                className="btn btn-ghost text-[#4c566a] hover:bg-[#eceff4] rounded-xl font-bold uppercase tracking-widest text-xs"
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