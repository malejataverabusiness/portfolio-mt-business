"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";

export default function About({ onBack, language = 'en' }: { onBack: () => void, language: 'en' | 'es' }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resetScroll = () => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = 0;
            }
        };
        resetScroll();
        const timer1 = setTimeout(resetScroll, 50);
        const timer2 = setTimeout(resetScroll, 150);
        const timer3 = setTimeout(resetScroll, 350);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    const t = {
        title: language === 'en' ? 'About me' : 'Sobre mí',
        back: language === 'en' ? 'Back' : 'Volver',
        greeting: language === 'en' ? 'Hello, I am Maria Tavera.' : 'Hola, soy Maria Tavera.',
        roleBadge: language === 'en' ? 'Senior Design Engineer (Frontend Engineer | UI/UX Designer)' : 'Diseñadora & Ingeniera de Software Senior (UI/UX & Frontend)',
        bio1: language === 'en' 
            ? 'I am a senior web designer and front-end programmer with over 14 years of hands-on experience crafting enterprise-grade digital products, design systems, e-commerce platforms, and high-performance web applications.' 
            : 'Soy diseñadora y programadora web senior con más de 14 años de experiencia creando productos digitales empresariales, sistemas de diseño, plataformas e-commerce y aplicaciones web de alto rendimiento.',
        bio2: language === 'en' 
            ? 'I bridge the traditional gap between design and engineering. Companies partner with me because I offer a complete end-to-end solution: from UX research, wireframing, and visual design tokens to pixel-perfect, clean, accessible, and fast React/Next.js/TypeScript code.' 
            : 'Elimino la brecha tradicional entre diseño e ingeniería. Las empresas confían en mi trabajo porque ofrezco una solución integral: desde investigación UX, wireframes y tokens de diseño, hasta código React/Next.js/TypeScript limpio, accesible y acelerado.',
        bio3: language === 'en'
            ? 'My career spans versatile work domains including UI/UX Design, Front-End Development, SaaS & PIM Platforms, E-Commerce, Webmaster Direction, Mobile Apps (React Native), EPUB Digital Publishing, and Core Web Vitals Performance Optimization.'
            : 'Mi trayectoria abarca múltiples campos laborales: Diseño UI/UX, Desarrollo Frontend, Plataformas SaaS/PIM, E-Commerce, Dirección Webmaster, Apps Móviles (React Native), Publicación Digital EPUB y Optimización de Rendimiento Web (Speed Insights/SEO).',
        servicesTitle: language === 'en' ? 'Core Expertise' : 'Campos Laborales & Especialidades',
        services: language === 'en' 
            ? ['Frontend Web Development (React/Next.js/TS)', 'UI/UX Design & Figma Systems', 'Design Systems & UI Component Libraries', 'E-Commerce & PIM Platforms', 'Webmaster Direction & CMS Operations', 'SEO, GEO & Web Performance Audits'] 
            : ['Desarrollo Web Frontend (React/Next.js/TS)', 'Diseño UI/UX y Prototipado en Figma', 'Sistemas de Diseño y Componentes Escalables', 'Plataformas E-Commerce y PIM', 'Dirección Webmaster y Operación CMS', 'Auditoría SEO, GEO y Rendimiento Web'],
        clientsTitle: language === 'en' ? "Enterprise Clients & Partners" : 'Empresas y Clientes Destacados',
        contactTitle: language === 'en' ? 'Looking for a senior web designer & programmer for your company?' : '¿Buscas una diseñadora y programadora web senior para tu empresa?',
        contactBtn: language === 'en' ? 'CONNECT ON LINKEDIN' : 'CONECTAR EN LINKEDIN'
    };

    return (
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
            <div className="flex-none flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t.title}</h2>
                    <p className="text-xs font-semibold text-petite-orchid tracking-wider uppercase mt-1">{t.roleBadge}</p>
                </div>
                <button
                    onClick={onBack}
                    aria-label={t.back}
                    className="bg-white/10 hover:bg-white/20 text-slate-900 transition-all rounded-full p-2 flex items-center gap-2 px-4 shadow-sm border border-white/20 backdrop-blur-md cursor-pointer"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    <span className="text-sm font-medium">{t.back}</span>
                </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto pb-4 custom-scrollbar pr-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    
                    {/* Profile Image Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="md:col-span-4 lg:col-span-5"
                    >
                        <div className="rounded-glass-lg overflow-hidden glass-panel border border-white/30 p-2 shadow-sm w-full h-[400px] md:h-[480px] relative">
                            <div className="w-full h-full rounded-glass-md bg-gradient-to-br from-petite-orchid/20 to-cold-purple/20 relative overflow-hidden">
                                <Image 
                                    src="/images/maria-tavera.png"
                                    alt="Maria Tavera — UI UX Designer & Frontend Programmer"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 500px"
                                    className="object-cover object-top"
                                    priority
                                    unoptimized
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Bio and Info Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="md:col-span-8 lg:col-span-7 flex flex-col justify-center"
                    >
                        <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{t.greeting}</h3>
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium mb-4">
                            {t.bio1}
                        </p>
                        <p className="text-base text-slate-600 leading-relaxed mb-4">
                            {t.bio2}
                        </p>
                        <p className="text-base text-slate-600 leading-relaxed mb-8 font-light">
                            {t.bio3}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4">{t.servicesTitle}</h4>
                                <ul className="space-y-2">
                                    {t.services.map((service, idx) => (
                                        <li key={idx} className="text-slate-600 flex items-start gap-2 font-medium text-xs">
                                            <span className="w-1.5 h-1.5 rounded-full bg-petite-orchid mt-1.5 shrink-0"></span>
                                            <span>{service}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4">{t.clientsTitle}</h4>
                                <ul className="flex flex-wrap gap-2 text-slate-600">
                                    {['TiendApp SAS', 'Santuario App', 'Alpina', 'Cabaña Alpina', 'UpCard', 'Nova', 'Corez', 'SproutLoud', 'Samsung', 'El Colombiano', 'Grupo Éxito', 'Linkapedia'].map((client, idx) => (
                                        <li key={idx} className="glass-panel px-3 py-1 rounded-full text-xs font-medium border border-white/40">
                                            {client}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="glass-panel rounded-glass-md p-6 border border-white/30 flex flex-col sm:flex-row items-center gap-6 justify-between bg-white/20">
                            <h4 className="text-lg font-bold text-slate-900 text-center sm:text-left max-w-[240px] leading-tight">
                                {t.contactTitle}
                            </h4>
                            <a href="https://www.linkedin.com/in/maleja-tavera/" target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-slate-900 text-white font-bold tracking-wider uppercase text-xs px-8 py-4 rounded-full hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl hover:scale-105 text-center">
                                {t.contactBtn}
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
