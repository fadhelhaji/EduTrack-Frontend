function Footbar() {
  return (
    <footer className="footer footer-center p-4 bg-base-200 text-base-content border-t border-base-300">
      <aside className="flex flex-col items-center gap-4">
        
    
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="w-14 h-14 fill-primary relative z-10"
          >
            <path d="M12 2L1 9l11 7 9-5.73V17h2V9L12 2zm7 11.27l-7 4.45-7-4.45V15l7 4.5 7-4.5v-1.73z" />
          </svg>
        </div>
        
        <div>
          <p className="text-2xl font-black tracking-tighter text-base-content">
            EduTrack
          </p>
          <p className="opacity-60 text-sm mt-1 font-medium">
            Empowering Education since 2026
          </p>
        </div>

        <div className="h-px w-24 bg-primary/10 my-2"></div>

        <p className="text-xs opacity-50 uppercase tracking-widest font-semibold">
          © {new Date().getFullYear()} EduTrack — All rights reserved
        </p>
      </aside>
    </footer>
  );
}

export default Footbar;