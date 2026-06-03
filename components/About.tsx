"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";

export default function About({ onBack, language = 'en' }: { onBack: () => void, language: 'en' | 'es' }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, []);

    const t = {
        title: language === 'en' ? 'About Me' : 'Sobre Mí',
        back: language === 'en' ? 'Back' : 'Volver',
        greeting: language === 'en' ? 'Hi there.' : 'Hola.',
        bio1: language === 'en' ? 'I specialize in collaborating with product teams and engineering groups to build high-quality web products, design systems, and intuitive user experiences.' : 'Me especializo en colaborar con equipos de producto y desarrollo para construir productos web de alta calidad, sistemas de diseño y experiencias de usuario intuitivas.',
        bio2: language === 'en' ? 'With over 14 years of experience bridging the gap between visual design and front-end development, I enjoy creating accessible, polished, and high-performance interfaces that solve real-world problems.' : 'Con más de 14 años de experiencia uniendo el diseño visual y el desarrollo front-end, me apasiona crear interfaces accesibles, pulidas y de alto rendimiento que resuelvan problemas reales.',
        servicesTitle: language === 'en' ? 'Expertise' : 'Especialidades',
        services: language === 'en' ? ['UI/UX Design', 'Front-end Development', 'Design Systems', 'Brand Identity', 'Product Strategy'] : ['Diseño UI/UX', 'Desarrollo Front-end', 'Sistemas de Diseño', 'Identidad de Marca', 'Estrategia de Producto'],
        clientsTitle: language === 'en' ? "Companies I've Worked With" : 'Empresas con las que he Trabajado',
        contactTitle: language === 'en' ? 'Interested in discussing a role or project?' : '¿Interesado en conversar sobre alguna vacante o proyecto?',
        contactBtn: language === 'en' ? 'CONNECT ON LINKEDIN' : 'CONECTAR EN LINKEDIN'
    };

    return (
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
            <div className="flex-none flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t.title}</h2>
                <button
                    onClick={onBack}
                    className="bg-white/10 hover:bg-white/20 text-slate-900 transition-all rounded-full p-2 flex items-center gap-2 px-4 shadow-sm border border-white/20 backdrop-blur-md"
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
                        <div className="rounded-glass-lg overflow-hidden glass-panel border border-white/30 p-2 shadow-sm w-full aspect-[4/5] relative">
                            <div className="absolute inset-2 rounded-glass-md bg-gradient-to-br from-petite-orchid/20 to-cold-purple/20 relative overflow-hidden">
                                <Image 
                                    src="https://media.licdn.com/dms/image/v2/D4D03AQHq2Exg3kW3RA/profile-displayphoto-crop_800_800/B4DZ5NnYb1I8AI-/0/1779418631855?e=1781740800&v=beta&t=OVYpMtoAYIyZbB4OdG1gX5ZbChMWKnI-zPy9YPUPECg"
                                    alt="María Alejandra Tavera"
                                    fill
                                    className="object-cover"
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
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">{t.greeting}</h3>
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium mb-6">
                            {t.bio1}
                        </p>
                        <p className="text-base text-slate-600 leading-relaxed mb-10">
                            {t.bio2}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">{t.servicesTitle}</h4>
                                <ul className="space-y-2">
                                    {t.services.map((service, idx) => (
                                        <li key={idx} className="text-slate-600 flex items-center gap-2 font-medium">
                                            <span className="w-1.5 h-1.5 rounded-full bg-petite-orchid"></span>
                                            {service}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">{t.clientsTitle}</h4>
                                <ul className="flex flex-wrap gap-2 text-slate-600">
                                    {['TiendApp SAS', 'Alpina', 'SproutLoud', 'Samsung', 'El Colombiano', 'Grupo Éxito', 'Yuxi Global', 'Linkapedia'].map((client, idx) => (
                                        <li key={idx} className="glass-panel px-3 py-1 rounded-full text-xs font-medium border border-white/40">
                                            {client}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="glass-panel rounded-glass-md p-6 border border-white/30 flex flex-col sm:flex-row items-center gap-6 justify-between bg-white/20">
                            <h4 className="text-lg font-bold text-slate-900 text-center sm:text-left max-w-[200px] leading-tight">
                                {t.contactTitle}
                            </h4>
                            <a href="https://www.linkedin.com/in/maleja-tavera/" target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-slate-900 text-white font-bold tracking-wider uppercase text-sm px-8 py-3 rounded-full hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl hover:scale-105 text-center">
                                {t.contactBtn}
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
