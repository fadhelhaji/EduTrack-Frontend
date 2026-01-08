import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <main className="overflow-x-hidden bg-base-300">
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#2e3440]">
        
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-[#88c0d0]/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/4 left-1/4 w-12 h-12 border-2 border-[#81a1c1]/30 rounded-lg animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border-2 border-[#b48ead]/20 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/3 right-1/12 w-8 h-8 bg-[#88c0d0]/20 rotate-45 animate-float"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 border border-white/5 rounded-full bg-white/5 backdrop-blur-md">
            <span className="text-sm font-medium text-[#d8dee9] tracking-wide">
              ✨ The Future of Academic Management
            </span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 animate-shine">
            EduTrack
          </h1>

          <p className="text-xl md:text-2xl text-[#d8dee9]/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Streamline your workflow with an interface designed for 
            <span className="text-[#88c0d0] font-medium"> performance</span> and 
            <span className="text-[#88c0d0] font-medium"> clarity</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/auth/sign-up" 
              className="btn btn-primary btn-lg px-12 rounded-full shadow-lg hover:shadow-[#88c0d0]/20 transition-all duration-300"
            >
              Get Started for Free
            </Link>
            <button 
              onClick={() => document.getElementById('roles').scrollIntoView({ behavior: 'smooth' })}
              className="text-[#d8dee9]/60 hover:text-white transition-colors font-medium flex items-center gap-2 group"
            >
              Explore Features
              <span className="group-hover:translate-y-1 transition-transform text-[#88c0d0]">↓</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20">
            <div className="w-6 h-10 border-2 border-[#d8dee9] rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-[#d8dee9] rounded-full animate-bounce"></div>
            </div>
        </div>
      </div>

      <div id="roles" className="py-32 px-8 max-w-7xl mx-auto">
  <div className="text-center mb-20">
    <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-base-content">
      Tailored Experiences
    </h2>
    <p className="text-lg opacity-60 max-w-xl mx-auto">
      Whether you're leading a lecture or mastering a new subject, EduTrack provides the precision tools you need.
    </p>
    <div className="h-1 w-20 bg-primary mx-auto rounded-full mt-6 opacity-50"></div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    
    
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to from-secondary/50 to-primary/30 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
      <div className="relative card bg-base-200/50 backdrop-blur-xl border border-white/5 p-2 transition-all duration-300 group-hover:-translate-y-3">
        <div className="card-body p-10">
          <div className="flex justify-between items-start">
            <div className="p-4 bg-secondary/10 rounded-2xl text-secondary mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-5 9 5M4 10v11m16-11v11" />
              </svg>
            </div>
            <div className="badge badge-secondary badge-outline font-bold tracking-widest px-4 py-3">INSTRUCTOR</div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Lead with Insight</h2>
          <p className="text-lg opacity-70 leading-relaxed mb-8">
            Manage curriculum delivery, and track your class and student progress.
          </p>
          
          <div className="card-actions">
            <Link to="/auth/sign-up" className="btn btn-secondary btn-block md:btn-wide rounded-xl shadow-lg shadow-secondary/20 hover:scale-105 transition-transform">
              Access Instructor Portal
            </Link>
          </div>
        </div>
      </div>
    </div>

    
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to from-accent/50 to-primary/30 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
      <div className="relative card bg-base-200/50 backdrop-blur-xl border border-white/5 p-2 transition-all duration-300 group-hover:-translate-y-3">
        <div className="card-body p-10">
          <div className="flex justify-between items-start">
            <div className="p-4 bg-accent/10 rounded-2xl text-accent mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="badge badge-accent badge-outline font-bold tracking-widest px-4 py-3">SCHOLAR</div>
          </div>

          <h2 className="text-3xl font-bold mb-4">Master Your Studies</h2>
          <p className="text-lg opacity-70 leading-relaxed mb-8">
            Centralize your assignments and track your path toward academic mastery in one unified view.
          </p>

          <div className="card-actions">
            <Link to="/auth/sign-up" className="btn btn-accent btn-block md:btn-wide rounded-xl shadow-lg shadow-accent/20 hover:scale-105 transition-transform">
              Open Student Portal
            </Link>
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