import { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="min-h-full bg-[#eceff4] flex items-center justify-center font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-black text-[#2e3440] tracking-tighter uppercase">Account Profile</h1>
        <p className="text-[#4c566a] font-medium tracking-widest text-xs uppercase opacity-60">Manage your details</p>
      </header>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-[#d8dee9] overflow-hidden mb-10">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-[#d8dee9] overflow-hidden">
          
          <div className="h-24 bg-[#2e3440] relative">
            <div className="absolute -bottom-10 left-10 w-20 h-20 bg-[#88c0d0] rounded-2xl border-4 border-white flex items-center justify-center text-2xl font-black text-[#2e3440]">
              {user.username?.charAt(0).toUpperCase()}
            </div>
          </div>


          <div className="pt-12 p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              

              <section className="space-y-4">
                <div>
                  <h3 className="text-[9px] font-black text-[#88c0d0] uppercase tracking-[0.3em] mb-1">Username</h3>
                  <p className="text-lg font-bold text-[#2e3440] leading-none">{user.username}</p>
                </div>
                
                <div>
                  <h3 className="text-[9px] font-black text-[#88c0d0] uppercase tracking-[0.3em] mb-1">Role</h3>
                  <span className="inline-block px-3 py-1 bg-[#2e3440] text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                    {user.role}
                  </span>
                </div>

                {user.employeeId && (
                  <div>
                    <h3 className="text-[9px] font-black text-[#5e81ac] uppercase tracking-[0.3em] mb-1">Employee ID</h3>
                    <p className="text-lg font-bold text-[#2e3440] leading-none">{user.employeeId}</p>
                  </div>
                )}
              </section>

              <section className="space-y-4 md:border-l md:pl-10 border-[#d8dee9]">
                <div>
                  <h3 className="text-[9px] font-black text-[#88c0d0] uppercase tracking-[0.3em] mb-1">First Name</h3>
                  <p className="text-lg font-bold text-[#2e3440] leading-none">{user.firstName || 'Not provided'}</p>
                </div>
                
                <div>
                  <h3 className="text-[9px] font-black text-[#88c0d0] uppercase tracking-[0.3em] mb-1">Last Name</h3>
                  <p className="text-lg font-bold text-[#2e3440] leading-none">{user.lastName || 'Not provided'}</p>
                </div>

                <div>
                  <h3 className="text-[9px] font-black text-[#88c0d0] uppercase tracking-[0.3em] mb-1">Status</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-xs font-bold text-[#4c566a]">Active Account</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;