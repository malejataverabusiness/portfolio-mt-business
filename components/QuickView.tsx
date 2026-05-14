"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { projects } from "./Projects"; 

export default function QuickView({ onBack, language = 'en' }: { onBack: () => void, language: 'en' | 'es' }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ container: containerRef });
    
    const headerX = useTransform(scrollYProgress, [0.1, 0.6], [0, -1000]);

    const t = {
        heroTitle: language === 'en' ? "From chaos to the perfect flow!" : "Del caos al equilibrio técnico y visual",
        featured: language === 'en' ? "FEATURED WORK" : "TRABAJO DESTACADO",
        servicesTitle: language === 'en' ? "WHAT I DO*" : "LO QUE HAGO*",
        servicesSub: language === 'en' 
            ? "I approach product design through brand alignment and storytelling, using UI/UX, frontend engineering, and interaction to create work that is not only visually strong but highly usable." 
            : "Abordo el diseño de productos a través de la identidad de marca, usando UI/UX, desarrollo frontend y código para crear un trabajo visualmente fuerte y altamente usable.",
        clients: language === 'en' ? "EXPERIENCED WITH*" : "TRAYECTORIA CON*",
        clientsSub: language === 'en' ? "Brands, teams, and ecosystems I've helped scale through code and design." : "Marcas, equipos y ecosistemas que he ayudado a escalar con código y diseño.",
        footerTitle: language === 'en' ? "got a project in mind?" : "¿tienes un proyecto en mente?",
        footerTalk: language === 'en' ? "let’s talk." : "hablemos.",
        awardsTitle: language === 'en' ? "CAREER HIGHLIGHTS" : "EXPERIENCIA LABORAL",
        pressTitle: language === 'en' ? "EDUCATION" : "EDUCACIÓN",
        talksTitle: language === 'en' ? "CORE SKILLS" : "HABILIDADES",
        close: language === 'en' ? "Close" : "Cerrar",
        viewAll: language === 'en' ? "view all work" : "ver todos",
        caseStudy: language === 'en' ? 'Case Study' : 'Caso de Estudio',
        work: language === 'en' ? 'work' : 'trabajo',
        about: language === 'en' ? 'about' : 'sobre mí',
        lab: language === 'en' ? 'lab' : 'lab',

        // Services translations
        serv1_title: language === 'en' ? "interactive (" : "interactivo (",
        serv1_mid: language === 'en' ? ")" : ")",
        serv1_bot: language === 'en' ? "development" : "desarrollo",
        serv1_desc: language === 'en' ? "(01) Design and build interactive systems. I bridge the gap between high-level UI strategy and technical frontend reality." : "(01) Diseño y construcción de sistemas interactivos. Cierro la brecha entre la estrategia de UI y la realidad del código frontend.",
        serv1_l1: language === 'en' ? "(01.01) React & Next.js" : "(01.01) React & Next.js",
        serv1_l2: language === 'en' ? "(01.02) Web Optimization" : "(01.02) Optimización Web",
        serv1_l3: language === 'en' ? "(01.03) E-commerce & CMS" : "(01.03) E-commerce y CMS",
        
        serv2_title: language === 'en' ? "(" : "(",
        serv2_mid: language === 'en' ? ") creative" : ") creatividad",
        serv2_bot: language === 'en' ? "design" : "diseño",
        serv2_desc: language === 'en' ? "(02) Turning concepts into executable interfaces through a mastery of UX/UI, graphic design, and brand aesthetics." : "(02) Convirtiendo conceptos en interfaces a través de un dominio de UX/UI, diseño gráfico y estética de marca.",
        serv2_l1: language === 'en' ? "(02.01) UI/UX Design" : "(02.01) Diseño UI/UX",
        serv2_l2: language === 'en' ? "(02.02) Art Direction" : "(02.02) Dirección de Arte",
        serv2_l3: language === 'en' ? "(02.03) Prototyping (Figma)" : "(02.03) Prototipado (Figma)",

        serv3_title: language === 'en' ? "lead (" : "líder (",
        serv3_mid: language === 'en' ? ")" : ")",
        serv3_bot: language === 'en' ? "strategy" : "estrategia",
        serv3_desc: language === 'en' ? "(03) Aligning teams with business goals. I technically lead phases of the product life cycle leveraging AI workflows." : "(03) Alineando equipos con objetivos de negocio. Lidero técnicamente el ciclo aprovechando flujos con Inteligencia Artificial.",
        serv3_l1: language === 'en' ? "(03.01) Technical Leadership" : "(03.01) Liderazgo Técnico",
        serv3_l2: language === 'en' ? "(03.02) AI Automation" : "(03.02) Automatización con IA",
        serv3_l3: language === 'en' ? "(03.03) Webmastering" : "(03.03) Webmastering",

        // Experience 
        award1: language === 'en' ? "Frontend & UI/UX" : "Frontend & UI/UX",
        award1y: "Devbloom (25)",
        award2: language === 'en' ? "Design Lead" : "Líder de Diseño",
        award2y: "TIENDAPP (22-25)",
        award3: language === 'en' ? "Frontend Developer" : "Desarrollador Frontend",
        award3y: "Alpina (20-22)",
        award4: language === 'en' ? "Content Manager" : "Gestión de Contenido",
        award4y: "SAMSUNG (18-19)",

        // Education
        press1: language === 'en' ? "Digital Marketing • EAFIT" : "Marketing Digital • EAFIT",
        press2: language === 'en' ? "Advertising • Luis Amigó" : "Publicidad • Luis Amigó",
        press3: language === 'en' ? "Multimedia • SENA" : "Multimedia • SENA",
        
        // Skills
        talk1: language === 'en' ? "React Native & App Dev" : "React Native y Desarrollo Ext.",
        talk2: language === 'en' ? "UX Research & Visuals" : "UX Research y Visuales",
        talk3: language === 'en' ? "AI Prompting & Pipelines" : "Prompting IA y Procesos",
    };

    return (
        <motion.div 
            ref={containerRef}
            className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden font-sans smooth-scroll bg-slate-900/95 backdrop-blur-2xl text-slate-50 transition-colors duration-500"
        >
            {/* Navigation exact match style */}
            <div className="fixed top-8 w-full px-8 z-[101] flex justify-between items-center text-white text-lg lowercase font-bold hidden md:flex pointer-events-none">
                <button onClick={onBack} className="transition-all pointer-events-auto hover:opacity-50 hover:text-petite-orchid">mt</button>
                <div className="flex gap-8">
                    <span onClick={() => {}} className="transition-all cursor-pointer pointer-events-auto hover:opacity-50 hover:text-petite-orchid">{t.work}</span>
                    <span onClick={() => {}} className="transition-all cursor-pointer pointer-events-auto hover:opacity-50 hover:text-petite-orchid">{t.about}</span>
                    <span onClick={() => {}} className="transition-all cursor-pointer pointer-events-auto hover:opacity-50 hover:text-petite-orchid">{t.lab}</span>
                </div>
            </div>

            {/* Mobile Close */}
            <button onClick={onBack} className="fixed top-6 right-6 z-[101] bg-white text-slate-900 px-4 py-2 rounded-full text-xs hover:scale-105 transition-transform md:hidden font-bold uppercase tracking-wider shadow-xl">
                {t.close}
            </button>

            {/* Corner Badges */}
            <div className="fixed bottom-8 left-8 z-[101] text-white/50 text-xs font-bold uppercase tracking-widest hidden md:block">Portfolio / 26</div>
            <div className="fixed bottom-8 right-8 z-[101] text-white/50 text-xs font-bold uppercase tracking-widest hidden md:block opacity-60">Scroll slowly</div>

            {/* Hero Section */}
            <section className="min-h-[90vh] flex items-center justify-center p-4 md:p-8 pt-24 max-w-7xl mx-auto">
                <h1 className="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] font-black tracking-tighter leading-[0.9] text-center uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 drop-shadow-xl">
                    {t.heroTitle}
                </h1>
            </section>

            {/* Bio Scrollytelling */}
            <section className="py-32 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.2] tracking-tight">
                    {language === 'en' ? (
                        <>
                            María Tavera is a <span className="text-petite-orchid hover:opacity-80 transition-colors cursor-crosshair">multidisciplinary designer</span> and frontend developer who blends art direction, <span className="text-rock-blue">technical execution</span>, and UI/UX into cohesive digital storytelling.
                        </>
                    ) : (
                        <>
                            María Tavera es una <span className="text-petite-orchid hover:opacity-80 transition-colors cursor-crosshair">diseñadora multidisciplinaria</span> y desarrolladora frontend que fusiona dirección de arte, <span className="text-rock-blue">ejecución técnica</span>, y UI/UX en narrativas digitales.
                        </>
                    )}
                </h2>
            </section>

            {/* Featured Work Horizontal Parallax */}
            <section className="py-20 overflow-hidden min-h-screen">
                <motion.h2 
                    style={{ x: headerX }}
                    className="text-[6rem] md:text-[15rem] font-black uppercase whitespace-nowrap mb-16 md:mb-32 px-8 text-white/5 tracking-tighter"
                >
                    {t.featured} - {t.featured} - {t.featured}
                </motion.h2>

                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-32 md:gap-48 relative z-10">
                    {projects.slice(0, 4).map((proj, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                            <motion.div 
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="w-full md:w-2/3 aspect-[16/10] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                            >
                                <Image src={proj.image} alt={proj.title} fill className="object-cover transition-transform duration-[1.5s] hover:scale-105" />
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="w-full md:w-1/3 flex flex-col gap-4"
                            >
                                <h3 className="text-4xl md:text-5xl font-black tracking-tight">{proj.title}</h3>
                                <p className="text-base md:text-xl font-bold tracking-tight mt-2 opacity-60 uppercase flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-cold-purple"></span>
                                    {proj.category}
                                </p>
                                <a href={proj.link} target="_blank" rel="noreferrer" className="mt-8 text-xl font-black border-b border-white/30 self-start hover:border-petite-orchid hover:text-petite-orchid transition-all pb-1 uppercase tracking-widest text-sm">
                                    {t.caseStudy}
                                </a>
                            </motion.div>
                        </div>
                    ))}
                    <div className="flex justify-center mt-12 w-full">
                        <button onClick={onBack} className="border border-white/30 px-8 py-4 rounded-full uppercase font-black tracking-widest hover:border-petite-orchid hover:bg-petite-orchid hover:text-slate-900 transition-all text-sm shadow-xl">
                            {t.viewAll}
                        </button>
                    </div>
                </div>
            </section>

            {/* WHAT I DO */}
            <section className="py-32 md:py-48 px-6 md:px-12 min-h-screen">
                <div className="max-w-7xl mx-auto w-full">
                    <h2 className="text-4xl md:text-8xl font-black mb-8 tracking-tighter lowercase">{t.servicesTitle}</h2>
                    <p className="text-xl md:text-3xl font-medium max-w-4xl mb-24 opacity-80 leading-relaxed text-slate-300">
                        {t.servicesSub}
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-8 lg:gap-16">
                        <div className="border-t-[2px] border-white/20 pt-8">
                            <h3 className="text-3xl md:text-4xl font-black lowercase mb-8 flex flex-col items-start leading-[1.1] text-petite-orchid">
                                <span>{t.serv1_title}</span>
                                <span className="pl-12">{t.serv1_mid}</span>
                                <span>{t.serv1_bot}</span>
                            </h3>
                            <p className="text-lg opacity-80 mb-8 max-w-sm font-medium leading-relaxed">
                                {t.serv1_desc}
                            </p>
                            <ul className="space-y-4 opacity-100 font-bold tracking-tight bg-white/5 border border-white/10 p-6 rounded-3xl">
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-sm opacity-50">check</span>{t.serv1_l1}</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-sm opacity-50">check</span>{t.serv1_l2}</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-sm opacity-50">check</span>{t.serv1_l3}</li>
                            </ul>
                        </div>
                        <div className="border-t-[2px] border-white/20 pt-8">
                            <h3 className="text-3xl md:text-4xl font-black lowercase mb-8 flex flex-col items-start leading-[1.1] text-rock-blue">
                                <span>{t.serv2_title}</span>
                                <span className="pl-6">{t.serv2_mid}</span>
                                <span>{t.serv2_bot}</span>
                            </h3>
                            <p className="text-lg opacity-80 mb-8 max-w-sm font-medium leading-relaxed">
                                {t.serv2_desc}
                            </p>
                            <ul className="space-y-4 opacity-100 font-bold tracking-tight bg-white/5 border border-white/10 p-6 rounded-3xl">
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-sm opacity-50">check</span>{t.serv2_l1}</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-sm opacity-50">check</span>{t.serv2_l2}</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-sm opacity-50">check</span>{t.serv2_l3}</li>
                            </ul>
                        </div>
                        <div className="border-t-[2px] border-white/20 pt-8">
                            <h3 className="text-3xl md:text-4xl font-black lowercase mb-8 flex flex-col items-start leading-[1.1] text-cold-purple">
                                <span>{t.serv3_title}</span>
                                <span className="pl-12">{t.serv3_mid}</span>
                                <span>{t.serv3_bot}</span>
                            </h3>
                            <p className="text-lg opacity-80 mb-8 max-w-sm font-medium leading-relaxed">
                                {t.serv3_desc}
                            </p>
                            <ul className="space-y-4 opacity-100 font-bold tracking-tight bg-white/5 border border-white/10 p-6 rounded-3xl">
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-sm opacity-50">check</span>{t.serv3_l1}</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-sm opacity-50">check</span>{t.serv3_l2}</li>
                                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-sm opacity-50">check</span>{t.serv3_l3}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Career & Education Mapping */}
            <section className="py-20 md:py-32 px-6 md:px-12 border-t border-white/10 bg-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black mb-12 border-b-[2px] border-white/20 pb-8 uppercase text-petite-orchid">{t.awardsTitle}</h2>
                        <ul className="space-y-6 text-xl md:text-2xl font-bold tracking-tight">
                            <li className="flex justify-between items-center border-b border-white/10 pb-4 hover:opacity-60 transition-opacity"><span>{t.award1}</span> <span className="opacity-50 text-base">{t.award1y}</span></li>
                            <li className="flex justify-between items-center border-b border-white/10 pb-4 hover:opacity-60 transition-opacity"><span>{t.award2}</span> <span className="opacity-50 text-base">{t.award2y}</span></li>
                            <li className="flex justify-between items-center border-b border-white/10 pb-4 hover:opacity-60 transition-opacity"><span>{t.award3}</span> <span className="opacity-50 text-base">{t.award3y}</span></li>
                            <li className="flex justify-between items-center border-b border-white/10 pb-4 hover:opacity-60 transition-opacity"><span>{t.award4}</span> <span className="opacity-50 text-base">{t.award4y}</span></li>
                        </ul>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                         <div>
                            <h2 className="text-2xl md:text-3xl font-black mb-8 border-b-[2px] border-white/20 pb-6 uppercase text-rock-blue">{t.pressTitle}</h2>
                            <ul className="space-y-4 text-base md:text-lg opacity-80 font-bold tracking-tight">
                                <li className="hover:opacity-60 transition-opacity">{t.press1}</li>
                                <li className="hover:opacity-60 transition-opacity">{t.press2}</li>
                                <li className="hover:opacity-60 transition-opacity">{t.press3}</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black mb-8 border-b-[2px] border-white/20 pb-6 uppercase text-cold-purple">{t.talksTitle}</h2>
                            <ul className="space-y-4 text-base md:text-lg opacity-80 font-bold tracking-tight">
                                <li className="hover:opacity-60 transition-opacity">{t.talk1}</li>
                                <li className="hover:opacity-60 transition-opacity">{t.talk2}</li>
                                <li className="hover:opacity-60 transition-opacity">{t.talk3}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Clients (Experience Entities) */}
            <section className="py-20 md:py-32 px-6 md:px-12 bg-white/5">
                <div className="max-w-7xl mx-auto w-full">
                    <h2 className="text-5xl md:text-8xl font-black mb-8 lowercase tracking-tighter">{t.clients}</h2>
                    <p className="text-xl md:text-3xl font-medium leading-relaxed max-w-4xl opacity-80 mb-20 border-l-[3px] border-petite-orchid pl-6">
                        {t.clientsSub}
                    </p>
                    <div className="flex flex-wrap gap-x-8 gap-y-6 md:gap-x-16 opacity-90 text-2xl md:text-4xl font-black tracking-tighter uppercase leading-none items-center">
                        <span className="hover:text-petite-orchid transition-colors cursor-crosshair">Devbloom</span>
                        <span className="hover:text-rock-blue transition-colors cursor-crosshair">Tiendapp SAS</span>
                        <span className="hover:text-cold-purple transition-colors cursor-crosshair">Alpina</span> 
                        <span className="hover:text-petite-orchid transition-colors cursor-crosshair">Samsung</span> 
                        <span className="hover:text-rock-blue transition-colors cursor-crosshair">SproutLoud</span>
                        <span className="hover:text-cold-purple transition-colors cursor-crosshair">El Colombiano</span>
                        <span className="hover:text-petite-orchid transition-colors cursor-crosshair">Grupo Éxito</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="py-20 md:py-40 px-6 md:px-12 min-h-[60vh] flex flex-col justify-end bg-slate-900 border-t border-white/10">
                <div className="max-w-7xl mx-auto w-full">
                    <p className="text-2xl md:text-4xl mb-4 lowercase font-black tracking-tight">{t.footerTitle}</p>
                    <p className="text-2xl md:text-4xl mb-12 lowercase font-black text-petite-orchid tracking-tight">{t.footerTalk}</p>
                    <a href="mailto:mt.business@example.com" className="text-[9vw] md:text-[11vw] font-black leading-[0.8] hover:opacity-70 transition-opacity tracking-tighter block w-full whitespace-nowrap overflow-hidden text-ellipsis lowercase drop-shadow-xl text-white">
                        hello@mt.com
                    </a>
                    
                    <div className="mt-32 pt-12 border-t-[2px] border-white/20 flex flex-col md:flex-row justify-between items-center opacity-80 text-sm font-black uppercase tracking-widest gap-4 text-white">
                        <span>MT*</span>
                        <span>/26</span>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
