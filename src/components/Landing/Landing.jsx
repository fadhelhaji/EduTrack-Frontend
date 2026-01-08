import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <main className="overflow-x-hidden bg-[#eceff4]">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#2e3440]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#88c0d0]/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/4 left-1/4 w-12 h-12 border-2 border-[#81a1c1]/20 rounded-lg animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border-2 border-[#b48ead]/10 rounded-full animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
            <span className="text-sm font-medium text-[#d8dee9] tracking-wide flex items-center gap-2">
              ✨ The Future of Academic Management
            </span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 animate-shine text-[#eceff4]">
            EduTrack
          </h1>
          <p className="text-xl md:text-2xl text-[#d8dee9]/80 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Empower instructors with <span className="text-[#88c0d0] font-semibold">total oversight</span> and students with <span className="text-[#88c0d0] font-semibold">automated GitHub tracking</span> in one unified command center.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/auth/sign-up" className="btn bg-[#88c0d0] hover:bg-[#81a1c1] text-[#2e3440] border-none btn-lg px-12 rounded-full shadow-xl transition-all duration-300 hover:scale-105 font-bold text-lg">
              Get Started for Free
            </Link>
            <button onClick={() => document.getElementById('roles').scrollIntoView({ behavior: 'smooth' })} className="text-[#d8dee9]/80 hover:text-white transition-colors font-medium flex items-center gap-2 group">
              Explore Features <span className="group-hover:translate-y-1 transition-transform text-[#88c0d0]">↓</span>
            </button>
          </div>
        </div>
      </div>

      {/* Features & Roles Section */}
      <div id="roles" className="py-24 px-8 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* The Platform Card */}
        <div className="relative group w-full max-w-5xl mb-32">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#88c0d0] via-[#5e81ac] to-[#b48ead] rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>
          <div className="relative hero bg-[#2e3440] rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#88c0d0] rounded-full blur-[80px] animate-blob"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#b48ead] rounded-full blur-[80px] animate-blob animation-delay-2000"></div>
            </div>
            
            <div className="hero-content text-center p-12 md:p-20 relative z-10">
              <div className="max-w-2xl">
                <div className="badge bg-white/10 backdrop-blur-md text-[#88c0d0] font-black tracking-[0.4em] uppercase mb-8 p-4 border border-white/20">
                  The Platform
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                  Centralized Learning <span className="text-[#88c0d0]">Control.</span>
                </h2>
                <p className="text-xl text-[#d8dee9]/80 font-medium leading-relaxed">
                  EduTrack is a high-performance management system designed to bridge the gap between 
                  <span className="text-white font-bold"> technical submissions</span> and 
                  <span className="text-white font-bold"> administrative oversight</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl font-black tracking-tighter text-[#3b4252] uppercase mb-2">Access Portals</h2>
          <p className="text-[#4c566a] font-bold tracking-[0.3em] text-xs uppercase opacity-60">Identify Your Workspace</p>
          <div className="w-16 h-1 bg-[#88c0d0] mt-4 rounded-full"></div>
        </div>

        {/* Access Portals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl mb-32">
          {/* Instructor Card */}
          <div className="group relative transition-all duration-500 hover:-translate-y-3">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#5e81ac] to-[#88c0d0] rounded-[2rem] blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative bg-[#f8fafc] rounded-[1.8rem] p-12 border border-[#d8dee9] shadow-sm flex flex-col items-center text-center h-full overflow-hidden">
              <div className="w-16 h-16 bg-[#5e81ac] text-white rounded-2xl flex items-center justify-center shadow-lg mb-8 transition-transform duration-500 group-hover:rotate-12">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h3 className="text-4xl font-black text-[#2e3440] uppercase tracking-tighter mb-2">Instructor</h3>
              <p className="text-xs font-black text-[#5e81ac] tracking-[0.2em] uppercase mb-6 opacity-80">Administrative Suite</p>
              <p className="text-[#4c566a] font-medium leading-relaxed mb-10 flex-grow">
                Complete orchestration tools. Manage student rosters, deploy class groups, and audit all technical submissions from one command center.
              </p>
              <Link to="/auth/sign-up" className="btn btn-block bg-[#2e3440] hover:bg-[#3b4252] text-white border-none py-4 h-auto text-sm font-black uppercase tracking-widest rounded-xl shadow-md transition-all">
                Enter Portal <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Student Card */}
          <div className="group relative transition-all duration-500 hover:-translate-y-3">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#b48ead] to-[#d8dee9] rounded-[2rem] blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative bg-[#f8fafc] rounded-[1.8rem] p-12 border border-[#d8dee9] shadow-sm flex flex-col items-center text-center h-full overflow-hidden">
              <div className="w-16 h-16 bg-[#b48ead] text-white rounded-2xl flex items-center justify-center shadow-lg mb-8 transition-transform duration-500 group-hover:-rotate-12">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h3 className="text-4xl font-black text-[#2e3440] uppercase tracking-tighter mb-2">Student</h3>
              <p className="text-xs font-black text-[#b48ead] tracking-[0.2em] uppercase mb-6 opacity-80">Operational Suite</p>
              <p className="text-[#4c566a] font-medium leading-relaxed mb-10 flex-grow">
                Personalized progress tracking. View your submission timeline, verify task completion, and link GitHub repositories for grading.
              </p>
              <Link to="/auth/sign-up" className="btn btn-block bg-[#2e3440] hover:bg-[#3b4252] text-white border-none py-4 h-auto text-sm font-black uppercase tracking-widest rounded-xl shadow-md transition-all">
                Enter Portal <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Lists */}
        <div className="w-full space-y-12">
          {/* Instructor Features Card */}
          <div className="relative group overflow-hidden bg-[#f1f5f9] border border-[#d8dee9] rounded-[2.5rem] shadow-sm hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#5e81ac]/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
            <div className="p-12 text-center relative z-10">
              <h3 className="text-xs font-black text-[#5e81ac] tracking-[0.4em] uppercase mb-12">Instructor Core Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#5e81ac]/10 text-[#5e81ac] rounded-2xl flex items-center justify-center mb-6"><svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>
                  <h4 className="font-black text-sm uppercase mb-3">Browse Students</h4>
                  <p className="text-sm text-[#4c566a] leading-relaxed max-w-[200px]">Access student database and active progress records.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#5e81ac]/10 text-[#5e81ac] rounded-2xl flex items-center justify-center mb-6"><svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg></div>
                  <h4 className="font-black text-sm uppercase mb-3">Manage Classes</h4>
                  <p className="text-sm text-[#4c566a] leading-relaxed max-w-[200px]">Build custom groups and update rosters instantly.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#5e81ac]/10 text-[#5e81ac] rounded-2xl flex items-center justify-center mb-6"><svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg></div>
                  <h4 className="font-black text-sm uppercase mb-3">View All Work</h4>
                  <p className="text-sm text-[#4c566a] leading-relaxed max-w-[200px]">Live feed of every student submission and current status.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Student Features Card */}
          <div className="relative group overflow-hidden bg-[#f1f5f9] border border-[#d8dee9] rounded-[2.5rem] shadow-sm hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#b48ead]/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
            <div className="p-12 text-center relative z-10">
              <h3 className="text-xs font-black text-[#b48ead] tracking-[0.4em] uppercase mb-12">Student Workspace Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#b48ead]/10 text-[#b48ead] rounded-2xl flex items-center justify-center mb-6"><svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                  <h4 className="font-black text-sm uppercase mb-3">History</h4>
                  <p className="text-sm text-[#4c566a] leading-relaxed max-w-[200px]">Access complete historical list of your submissions.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#b48ead]/10 text-[#b48ead] rounded-2xl flex items-center justify-center mb-6"><svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                  <h4 className="font-black text-sm uppercase mb-3">Live Tracking</h4>
                  <p className="text-sm text-[#4c566a] leading-relaxed max-w-[200px]">Check instantly if homework has been submitted.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#b48ead]/10 text-[#b48ead] rounded-2xl flex items-center justify-center mb-6"><svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></div>
                  <h4 className="font-black text-sm uppercase mb-3">GitHub Pipeline</h4>
                  <p className="text-sm text-[#4c566a] leading-relaxed max-w-[200px]">Submit assignments via repository URL links.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;