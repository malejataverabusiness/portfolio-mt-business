import TiltPanel from "@/components/TiltPanel";
import TimeDisplay from "@/components/TimeDisplay";

export default function Home() {
  return (
    <>
      <TiltPanel className="w-full max-w-6xl glass-panel rounded-glass-lg p-12 md:p-20 flex flex-col items-center justify-center text-center relative z-10 mt-24 mb-12">
        <header className="mb-14 relative z-20">
          <h1 className="text-6xl md:text-7xl font-light tracking-tighter mb-8 text-high-contrast">
            Hello, I'm <span className="font-black">María Tavera</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-800 max-w-3xl mx-auto leading-relaxed font-normal">
            With over +14 years of experience in UI/UX design and front-end development, I bridge the gap between
            complex logic and design. Crafting the future through design, interfaces and code.
          </p>
        </header>

        <div className="w-full max-w-2xl mb-20 relative z-20">
          <div className="glass-capsule rounded-glass-md p-2 flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-glass-sm flex items-center justify-center glass-panel inner-glow text-petite-orchid shadow-sm">
              <span className="material-symbols-outlined text-2xl">mic</span>
            </div>
            <input
              className="bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-500 text-lg w-full py-3 font-normal outline-none"
              placeholder="Explore María's expertise..."
              type="text"
            />
            <button className="mr-2 w-10 h-10 rounded-glass-sm flex items-center justify-center bg-slate-900/5 hover:bg-slate-900/10 transition-all">
              <span className="material-symbols-outlined text-xl text-slate-900">arrow_forward</span>
            </button>
          </div>
          <div className="mt-6 flex justify-center gap-8">
            <span className="text-[10px] text-slate-700 uppercase tracking-[0.3em] font-black">UiX Design</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black">•</span>
            <span className="text-[10px] text-slate-700 uppercase tracking-[0.3em] font-black">Front-end Development</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative z-20">
          <a className="nav-tile rounded-glass-md p-10 group flex flex-col items-center text-center block" href="https://www.linkedin.com/in/maleja-tavera/" target="_blank">
            <div className="w-16 h-16 rounded-glass-sm glass-panel inner-glow flex items-center justify-center mb-6 transition-all group-hover:scale-105 group-hover:border-petite-orchid/60">
              <span className="material-symbols-outlined text-3xl text-petite-orchid">work_history</span>
            </div>
            <h3 className="text-lg font-bold mb-2 tracking-tight text-slate-900">Experience</h3>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">14+ Years Professional Journey</p>
          </a>
          <a className="nav-tile rounded-glass-md p-10 group flex flex-col items-center text-center block" href="https://www.linkedin.com/in/maleja-tavera/" target="_blank">
            <div className="w-16 h-16 rounded-glass-sm glass-panel inner-glow flex items-center justify-center mb-6 transition-all group-hover:scale-105 group-hover:border-cold-purple/60">
              <span className="material-symbols-outlined text-3xl text-cold-purple">psychology</span>
            </div>
            <h3 className="text-lg font-bold mb-2 tracking-tight text-slate-900">Skills</h3>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">Technical & UI/UX Mastery</p>
          </a>
          <a className="nav-tile rounded-glass-md p-10 group flex flex-col items-center text-center block" href="https://www.behance.net/mt-business" target="_blank">
            <div className="w-16 h-16 rounded-glass-sm glass-panel inner-glow flex items-center justify-center mb-6 transition-all group-hover:scale-105 group-hover:border-rock-blue/60">
              <span className="material-symbols-outlined text-3xl text-rock-blue">grid_view</span>
            </div>
            <h3 className="text-lg font-bold mb-2 tracking-tight text-slate-900">Projects</h3>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">High-Performance Portfolio</p>
          </a>
        </div>
      </TiltPanel>

      <footer className="mt-auto mb-4 z-50 flex justify-center w-full">
        <div className="glass-panel px-10 py-4 rounded-glass-md flex items-center gap-10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-600 text-lg">schedule</span>
            <TimeDisplay />
          </div>
          <div className="h-5 w-[1px] bg-white/30"></div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-600 text-lg">travel_explore</span>
            <span className="text-[10px] font-bold tracking-widest text-slate-900 uppercase">Remote • Worldwide</span>
          </div>
          <div className="h-5 w-[1px] bg-white/30"></div>
          <div className="flex items-center gap-6">
            <a className="text-slate-700 hover:text-slate-900 transition-all" href="https://www.linkedin.com/in/maleja-tavera/">
              <span className="material-symbols-outlined text-lg">work</span>
            </a>
            <a className="text-slate-700 hover:text-slate-900 transition-all" href="https://www.behance.net/mt-business">
              <span className="material-symbols-outlined text-lg">palette</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
