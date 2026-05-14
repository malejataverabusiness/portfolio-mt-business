"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import TiltPanel from "@/components/TiltPanel";
import TimeDisplay from "@/components/TimeDisplay";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import SearchResults from "@/components/SearchResults";
import Landing from "@/components/Landing";
import clsx from "clsx";
import LanguageToggle from "@/components/LanguageToggle";
import VisualFeed from "@/components/VisualFeed";
import About from "@/components/About";
import QuickView from "@/components/QuickView";

type ViewState = "landing" | "hero" | "experience" | "skills" | "projects" | "results" | "visual-feed" | "about" | "quick-view";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 50, damping: 15 }
  }
};

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>("hero");
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const recognitionRef = useRef<any>(null);
  const silenceTimer = useRef<NodeJS.Timeout | null>(null);
  const latestTranscriptRef = useRef("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language || (navigator as any).userLanguage;
      if (browserLang.startsWith('es')) {
        setLanguage('es');
      }
    }
  }, []);

  const detectLanguage = (text: string) => {
    const spanishWords = ['hola', 'y', 'en', 'el', 'la', 'los', 'las', 'un', 'una', 'busco', 'necesito', 'quiero', 'experiencia', 'proyectos', 'habilidades', 'desarrollo', 'diseño', 'marketing', 'liderazgo', 'soy', 'es', 'con', 'para', 'como', 'hacer', 'trabajo'];
    const lowerText = text.toLowerCase();
    const words = lowerText.split(/\s+/);
    const matchCount = words.filter(w => spanishWords.includes(w)).length;

    if (matchCount > 0 && (matchCount / words.length > 0.15 || words.length < 3)) {
      return 'es';
    }
    return 'en';
  };

  useEffect(() => {
    if (searchQuery.length > 2) {
      const detected = detectLanguage(searchQuery);
      setLanguage(detected);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCurrentView("results");
    }
  };

  const isHesitation = (text: string) => {
    const hesitationWords = ['mmm', 'umm', 'um', 'uh', 'uhh', 'hmm', 'hm', 'eh', 'este'];
    const cleanText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
    const words = cleanText.split(/\s+/);
    const lastWord = words[words.length - 1];
    return hesitationWords.includes(lastWord);
  };

  const toggleVoiceSearch = () => {
    if (isListening) {
      if (silenceTimer.current) clearTimeout(silenceTimer.current);
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = language === 'es' ? 'es-US' : 'en-US';
      recognition.interimResults = true;
      recognition.continuous = true;

      recognition.onstart = () => {
        setIsListening(true);
        latestTranscriptRef.current = "";
      };

      recognition.onresult = (event: any) => {
        if (silenceTimer.current) clearTimeout(silenceTimer.current);

        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }

        const allTranscripts = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');

        setSearchQuery(allTranscripts);
        latestTranscriptRef.current = allTranscripts;

        silenceTimer.current = setTimeout(() => {
          recognition.stop();
          setIsListening(false);

          if (latestTranscriptRef.current.trim() && !isHesitation(latestTranscriptRef.current)) {
            setCurrentView("results");
          } else {
            console.log("Auto-search prevented due to hesitation.");
          }
        }, 3000);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        if (silenceTimer.current) clearTimeout(silenceTimer.current);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } else {
      alert("Voice search is not supported in this browser.");
    }
  };

  const getMicIcon = () => {
    if (isListening) return 'mic';
    if (!isListening && searchQuery.length > 0 && recognitionRef.current) return 'mic_off';
    return 'mic';
  };

  const getMicColorClass = () => {
    if (isListening) return 'text-cold-purple animate-pulse bg-cold-purple/20';
    if (!isListening && recognitionRef.current) return 'text-slate-400';
    return 'text-petite-orchid';
  };

  useEffect(() => {
    if (searchQuery === '' && !isListening) {
      recognitionRef.current = null;
    }
  }, [searchQuery, isListening]);

  useEffect(() => {
    return () => {
      if (silenceTimer.current) clearTimeout(silenceTimer.current);
    };
  }, []);

  const handleBack = () => setCurrentView("hero");

  const t = {
    greeting: language === 'en' ? "Hello, I'm" : "Hola, soy",
    expert: language === 'en' ? "With over +14 years of experience in UI/UX design and front-end development, I bridge the gap between complex logic and design. Crafting the future through design, interfaces and code." : "Con más de +14 años de experiencia en diseño UI/UX y desarrollo front-end, uno la brecha entre la lógica compleja y el diseño. Creando el futuro a través del diseño, interfaces y código.",
    placeholder: language === 'en' ? "Explore María's expertise..." : "Explora la experiencia de María...",
    role1: language === 'en' ? "UiX Design" : "Diseño UiX",
    role2: language === 'en' ? "Front-end Development" : "Desarrollo Front-end",
    expTitle: language === 'en' ? "Experience" : "Experiencia",
    expDesc: language === 'en' ? "14+ Years Professional Journey" : "14+ Años de Trayectoria",
    skillsTitle: language === 'en' ? "Skills" : "Habilidades",
    skillsDesc: language === 'en' ? "Technical & UI/UX Mastery" : "Maestría Técnica y UI/UX",
    projTitle: language === 'en' ? "Projects" : "Proyectos",
    projDesc: language === 'en' ? "High-Performance Portfolio" : "Portafolio de Alto Nivel",
    feedTitle: language === 'en' ? "Visual Feed" : "Feed Visual",
    feedDesc: language === 'en' ? "Inspiration & Extras" : "Inspiración",
    aboutTitle: language === 'en' ? "About Me" : "Sobre Mí",
    aboutDesc: language === 'en' ? "Bio & Services" : "Bio y Servicios",
    remote: language === 'en' ? "Remote • Worldwide" : "Remoto • Global"
  };

  return (
    <>
      <div className={clsx("relative z-10 w-full flex flex-col items-center transition-all duration-500",
        currentView === 'landing' ? "min-h-screen justify-start pt-6" :
          currentView === 'hero' ? "min-h-screen justify-center p-4 md:p-8" :
            "fixed inset-0 overflow-hidden p-4 md:p-8"
      )}>

        <div className="absolute top-4 right-4 md:top-8 md:right-0 z-50">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>

        <AnimatePresence mode="wait">
          {currentView === "landing" ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="w-full flex justify-center"
            >
              <Landing onEnter={() => setCurrentView("hero")} language={language} />
            </motion.div>
          ) : currentView === "hero" ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="w-full flex justify-center"
            >
              <TiltPanel className="w-full max-w-6xl glass-panel rounded-glass-lg p-6 md:p-20 flex flex-col items-center justify-center text-center relative mt-0 mb-8">

                <motion.div
                  key={language}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full flex flex-col items-center"
                >
                  <motion.header variants={itemVariants} className="mb-10 md:mb-14 relative z-20">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tighter mb-6 md:mb-8 text-high-contrast">
                      {t.greeting} <span className="font-black block md:inline">María Tavera</span>
                    </h1>
                    <div className="text-sm md:text-lg text-slate-800 max-w-3xl mx-auto leading-relaxed font-normal px-2">
                      {t.expert}
                    </div>
                  </motion.header>

                  <motion.div variants={itemVariants} className="w-full max-w-2xl mb-10 relative z-20">
                    <div className="glass-capsule rounded-glass-md p-2 flex items-center gap-2 md:gap-4 group">
                      <button
                        onClick={toggleVoiceSearch}
                        className={clsx("w-10 h-10 md:w-12 md:h-12 rounded-glass-sm flex items-center justify-center glass-panel inner-glow shadow-sm transition-all cursor-pointer hover:scale-105 flex-shrink-0", getMicColorClass())}
                      >
                        <span className="material-symbols-outlined text-xl md:text-2xl">{getMicIcon()}</span>
                      </button>
                      <input
                        className="bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-500 text-base md:text-lg w-full py-2 md:py-3 font-normal outline-none min-w-0"
                        placeholder={t.placeholder}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      />
                      <button onClick={handleSearch} className="mr-0 md:mr-2 w-10 h-10 rounded-glass-sm flex items-center justify-center bg-slate-900/5 hover:bg-slate-900/10 transition-all cursor-pointer hover:scale-105 flex-shrink-0">
                        <span className="material-symbols-outlined text-xl text-slate-900">arrow_forward</span>
                      </button>
                    </div>
                    <div className="mt-6 flex flex-wrap justify-center gap-4 md:gap-8">
                      <span className="text-[10px] text-slate-700 uppercase tracking-[0.3em] font-black">{t.role1}</span>
                      <span className="hidden md:inline text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black">•</span>
                      <span className="text-[10px] text-slate-700 uppercase tracking-[0.3em] font-black">{t.role2}</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full relative z-20">
                    <button onClick={() => setCurrentView("experience")} className="nav-tile rounded-glass-md p-6 md:p-10 group flex flex-col items-center text-center block w-full hover:bg-white/20 transition-all cursor-pointer">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-glass-sm glass-panel inner-glow flex items-center justify-center mb-4 md:mb-6 transition-all group-hover:scale-105 group-hover:border-petite-orchid/60">
                        <span className="material-symbols-outlined text-2xl md:text-3xl text-petite-orchid">work_history</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold mb-2 tracking-tight text-slate-900">{t.expTitle}</h3>
                      <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">{t.expDesc}</p>
                    </button>

                    <button onClick={() => setCurrentView("skills")} className="nav-tile rounded-glass-md p-6 md:p-10 group flex flex-col items-center text-center block w-full hover:bg-white/20 transition-all cursor-pointer">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-glass-sm glass-panel inner-glow flex items-center justify-center mb-4 md:mb-6 transition-all group-hover:scale-105 group-hover:border-cold-purple/60">
                        <span className="material-symbols-outlined text-2xl md:text-3xl text-cold-purple">psychology</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold mb-2 tracking-tight text-slate-900">{t.skillsTitle}</h3>
                      <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">{t.skillsDesc}</p>
                    </button>

                    <button onClick={() => setCurrentView("projects")} className="nav-tile rounded-glass-md p-6 md:p-10 group flex flex-col items-center text-center block w-full hover:bg-white/20 transition-all cursor-pointer">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-glass-sm glass-panel inner-glow flex items-center justify-center mb-4 md:mb-6 transition-all group-hover:scale-105 group-hover:border-rock-blue/60">
                        <span className="material-symbols-outlined text-2xl md:text-3xl text-rock-blue">grid_view</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold mb-2 tracking-tight text-slate-900">{t.projTitle}</h3>
                      <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">{t.projDesc}</p>
                    </button>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 max-w-2xl gap-4 md:gap-8 w-full relative z-20 mt-4 md:mt-8">
                    <button onClick={() => setCurrentView("visual-feed")} className="nav-tile rounded-glass-md p-6 md:p-10 group flex flex-col items-center text-center block w-full hover:bg-white/20 transition-all cursor-pointer">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-glass-sm glass-panel inner-glow flex items-center justify-center mb-4 md:mb-6 transition-all group-hover:scale-105 group-hover:border-blue-400/60">
                        <span className="material-symbols-outlined text-2xl md:text-3xl text-blue-400">photo_library</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold mb-2 tracking-tight text-slate-900">{t.feedTitle}</h3>
                      <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">{t.feedDesc}</p>
                    </button>

                    <button onClick={() => setCurrentView("about")} className="nav-tile rounded-glass-md p-6 md:p-10 group flex flex-col items-center text-center block w-full hover:bg-white/20 transition-all cursor-pointer">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-glass-sm glass-panel inner-glow flex items-center justify-center mb-4 md:mb-6 transition-all group-hover:scale-105 group-hover:border-orange-400/60">
                        <span className="material-symbols-outlined text-2xl md:text-3xl text-orange-400">person</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold mb-2 tracking-tight text-slate-900">{t.aboutTitle}</h3>
                      <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">{t.aboutDesc}</p>
                    </button>
                  </motion.div>

                </motion.div>
              </TiltPanel>
            </motion.div>
          ) : (
            <motion.div
              key={`content-${language}`}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="w-full flex justify-center h-full"
            >
              <div className="w-full max-w-6xl glass-panel rounded-glass-lg p-6 md:p-12 relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <span className="text-[6rem] md:text-[12rem] font-black leading-none tracking-tighter mix-blend-overlay">
                    {currentView === 'experience' && 'EXP'}
                    {currentView === 'skills' && 'SKL'}
                    {currentView === 'projects' && 'PRJ'}
                    {currentView === 'results' && 'SRC'}
                    {currentView === 'visual-feed' && 'VIS'}
                    {currentView === 'about' && 'ABT'}
                  </span>
                </div>

                {currentView === "experience" && <Experience onBack={handleBack} language={language} />}
                {currentView === "skills" && <Skills onBack={handleBack} language={language} />}
                {currentView === "projects" && <Projects onBack={handleBack} language={language} />}
                {currentView === "results" && <SearchResults query={searchQuery} onBack={handleBack} language={language} />}
                {currentView === "visual-feed" && <VisualFeed onBack={handleBack} language={language} />}
                {currentView === "about" && <About onBack={handleBack} language={language} />}
              </div>
            </motion.div>
          )}
          {currentView === "quick-view" && <QuickView onBack={handleBack} language={language} />}
        </AnimatePresence>

        <footer className={clsx("mt-auto mb-4 z-50 flex justify-center w-full transition-all duration-500", (currentView !== 'hero' && currentView !== 'landing') && "opacity-0 pointer-events-none absolute bottom-0", currentView === 'landing' && "opacity-0 pointer-events-none absolute bottom-0")}>
          <div className="glass-panel px-4 py-3 md:px-8 md:py-4 rounded-glass-md flex flex-col md:flex-row items-center gap-3 md:gap-8 shadow-md">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-600 text-base">schedule</span>
                <TimeDisplay />
              </div>
              <div className="hidden md:block h-4 w-[1px] bg-white/30"></div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-600 text-base">travel_explore</span>
                <span className="text-[10px] font-bold tracking-widest text-slate-900 uppercase">{t.remote}</span>
              </div>
            </div>
            <div className="h-[1px] w-full md:h-4 md:w-[1px] bg-white/30 my-2 md:my-0"></div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setCurrentView('landing')} className="text-slate-700 hover:text-slate-900 transition-all cursor-pointer hover:scale-110" title="Agency Landing">
                  <span className="material-symbols-outlined text-lg">domain</span>
                </button>
                <a className="text-slate-700 hover:text-slate-900 transition-all hover:scale-110" href="https://www.linkedin.com/in/maleja-tavera/" target="_blank" title="LinkedIn">
                  <span className="material-symbols-outlined text-lg">work</span>
                </a>
                <a className="text-slate-700 hover:text-slate-900 transition-all hover:scale-110" href="https://www.behance.net/mt-business" target="_blank" title="Behance">
                  <span className="material-symbols-outlined text-lg">palette</span>
                </a>
              </div>
              <div className="hidden md:block h-4 w-[1px] bg-white/30"></div>
              <button 
                onClick={() => setCurrentView('quick-view')} 
                className="bg-white/40 hover:bg-white/60 text-slate-900 text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full transition-all flex items-center gap-2 border border-white/40 shadow-sm hover:shadow-md hover:scale-105"
              >
                <span className="material-symbols-outlined text-sm">visibility</span>
                {language === 'en' ? 'Quick View' : 'Vista Rápida'}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
