import { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center font-bold text-[#2e3440] uppercase tracking-[0.4em] text-xs">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#88c0d0] rounded-full animate-ping"></div>
          Syncing Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-black text-[#2e3440] tracking-tighter uppercase">Account Profile</h1>
          <p className="text-[#4c566a] font-medium tracking-[0.3em] text-[10px] uppercase opacity-60">Verified Identity </p>
        </header>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-[#d8dee9] overflow-hidden">

          <div className="h-24 bg-[#2e3440] relative">
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 w-20 h-20 bg-[#88c0d0] rounded-2xl border-4 border-white flex items-center justify-center text-2xl font-black text-[#2e3440] shadow-lg">
              {user.username?.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="pt-14 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              
              <section className="space-y-6 text-center md:text-left">
                <div>
                  <h3 className="text-[9px] font-black text-[#88c0d0] uppercase tracking-[0.3em] mb-2">Username</h3>
                  <p className="text-xl font-bold text-[#2e3440] tracking-tight">{user.username}</p>
                </div>
                
                <div>
                  <h3 className="text-[9px] font-black text-[#88c0d0] uppercase tracking-[0.3em] mb-2">System Access</h3>
                  <span className="inline-block px-4 py-1.5 bg-[#2e3440] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-sm">
                    {user.role}
                  </span>
                </div>

                {user.employeeId && (
                  <div>
                    <h3 className="text-[9px] font-black text-[#5e81ac] uppercase tracking-[0.3em] mb-2">Employee ID</h3>
                    <p className="text-xl font-bold text-[#2e3440] tracking-tight">{user.employeeId}</p>
                  </div>
                )}
              </section>

              <section className="space-y-6 text-center md:text-left md:border-l md:pl-16 border-[#eceff4]">
                <div>
                  <h3 className="text-[9px] font-black text-[#88c0d0] uppercase tracking-[0.3em] mb-2">Full Name</h3>
                  <p className="text-xl font-bold text-[#2e3440] tracking-tight">
                    {user.firstName || '—'} {user.lastName || ''}
                  </p>
                  <p className="text-[10px] text-[#4c566a] opacity-50 font-bold uppercase mt-1">Full Identity Name</p>
                </div>

                <div>
                  <h3 className="text-[9px] font-black text-[#88c0d0] uppercase tracking-[0.3em] mb-2">Account Status</h3>
                  <p className="text-sm font-bold text-[#4c566a] uppercase tracking-widest">Active & Verified</p>
                </div>
              </section>
            </div>
          </div>

          <div className="bg-[#eceff4]/50 border-t border-[#d8dee9] px-8 py-4 flex justify-center">
             <p className="text-[8px] font-bold text-[#4c566a] uppercase tracking-[0.5em] opacity-40">
               Data Encrypted & Synchronized
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;