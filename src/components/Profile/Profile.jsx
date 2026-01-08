import { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';
const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) return <div className="min-h-screen bg-[#eceff4] flex items-center justify-center font-bold">Loading...</div>;

  return (
    <main className="min-h-[calc(100-80px)] bg-[#eceff4] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-black text-[#2e3440] tracking-tighter mb-2 uppercase">Account Profile</h1>
          <p className="text-[#4c566a] font-medium tracking-widest text-xs uppercase opacity-60">Manage your personal information</p>
        </header>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-[#d8dee9] overflow-hidden">
         
          <div className="h-32 bg-[#2e3440] relative">
            <div className="absolute -bottom-12 left-12 w-24 h-24 bg-[#88c0d0] rounded-3xl border-8 border-white flex items-center justify-center text-3xl font-black text-[#2e3440]">
              {user.username?.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="pt-16 p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              <section className="space-y-6">
                <div>
                  <h3 className="text-[10px] font-black text-[#88c0d0] uppercase tracking-[0.3em] mb-1">Username</h3>
                  <p className="text-xl font-bold text-[#2e3440]">{user.username}</p>
                </div>
                
                <div>
                  <h3 className="text-[10px] font-black text-[#88c0d0] uppercase tracking-[0.3em] mb-1">Role</h3>
                  <span className="inline-block px-3 py-1 bg-[#2e3440] text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                    {user.role}
                  </span>
                </div>

                {user.employeeId && (
                  <div>
                    <h3 className="text-[10px] font-black text-[#5e81ac] uppercase tracking-[0.3em] mb-1">Employee ID</h3>
                    <p className="text-xl font-bold text-[#2e3440]">{user.employeeId}</p>
                  </div>
                )}
              </section>

              <section className="space-y-6 md:border-l md:pl-12 border-[#d8dee9]">
                <div>
                  <h3 className="text-[10px] font-black text-[#88c0d0] uppercase tracking-[0.3em] mb-1">First Name</h3>
                  <p className="text-xl font-bold text-[#2e3440]">{user.firstName || 'Not provided'}</p>
                </div>
                
                <div>
                  <h3 className="text-[10px] font-black text-[#88c0d0] uppercase tracking-[0.3em] mb-1">Last Name</h3>
                  <p className="text-xl font-bold text-[#2e3440]">{user.lastName || 'Not provided'}</p>
                </div>

                <div>
                  <h3 className="text-[10px] font-black text-[#88c0d0] uppercase tracking-[0.3em] mb-1">Status</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-sm font-bold text-[#4c566a]">Active Account</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;