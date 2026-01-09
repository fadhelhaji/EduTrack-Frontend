const Footer = () => {
  return (
    <footer className=" w-full bg-[#2e3440] border-t border-white/5 h-16 px-12 flex items-center justify-center">
     
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -left-10 top-0 w-64 h-full bg-gradient-to from-transparent via-[#88c0d0]/10 to-transparent animate-slide-infinite"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full flex justify-center items-center relative z-10">
        <div className="flex items-center gap-4 group">
          
          <div className="relative">
            <div className="absolute inset-0 bg-[#88c0d0] rounded-full blur-md opacity-20 group-hover:opacity-40 animate-pulse"></div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="w-6 h-6 fill-[#88c0d0] relative transform transition-transform group-hover:scale-110 duration-500"
            >
              <path d="M12 2L1 9l11 7 9-5.73V17h2V9L12 2zm7 11.27l-7 4.45-7-4.45V15l7 4.5 7-4.5v-1.73z" />
            </svg>
          </div>

          
          <div className="flex flex-col">
            <span className="text-white font-black tracking-[0.2em] uppercase text-sm leading-none">
              EduTrack
            </span>
            <span className="text-[#d8dee9]/30 text-[9px] font-bold uppercase tracking-widest mt-1">
              Platform Active &bull; 2026
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;