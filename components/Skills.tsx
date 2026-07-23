"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export const skillCategories = [
    {
        title: "Frontend Engineering & Code",
        titleEs: "Desarrollo Frontend y Código",
        icon: "code",
        skills: [
            "React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS",
            "HTML5", "CSS3 / SASS", "Framer Motion", "Git & GitHub", "Responsive Web Design",
            "Performance (Core Web Vitals)", "REST APIs", "Unit Testing", "EPUB Programming"
        ],
        color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
        title: "UI/UX & Design Systems",
        titleEs: "Diseño UI/UX y Sistemas de Diseño",
        icon: "design_services",
        skills: [
            "Figma", "Design Systems", "Design Tokens", "Atomic Design",
            "Prototyping", "Wireframing", "UX Research", "UI Guidelines",
            "Micro-interactions", "Adobe Creative Suite", "Mobile App Layouts"
        ],
        color: "bg-purple-100 text-purple-800 border-purple-200",
    },
    {
        title: "SEO, GEO & Webmastering",
        titleEs: "SEO, GEO y Gestión Webmaster",
        icon: "trending_up",
        skills: [
            "Technical SEO", "GEO (Generative Engine Optimization)", "AEO (Answer Engine Optimization)",
            "LLMO (LLM Optimization)", "JSON-LD Structured Data", "WordPress & Gutenberg",
            "E-Commerce & PIM", "Speed Insights Tuning", "Google Tag Manager / GA4"
        ],
        color: "bg-green-100 text-green-800 border-green-200",
    },
    {
        title: "Leadership & AI Integration",
        titleEs: "Liderazgo e Integración de IA",
        icon: "groups",
        skills: [
            "Technical Leadership", "Cross-functional Alignment", "UI/UX Strategy",
            "AI Workflow Integration", "AI Agents & Assistive Tools", "Project Management",
            "Enterprise Stakeholder Communication", "Design-Engineering Bridge"
        ],
        color: "bg-rose-100 text-rose-800 border-rose-200",
    },
];

export default function Skills({ onBack, language = 'en' }: { onBack: () => void, language: 'en' | 'es' }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
        const timer = setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = 0;
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const t = {
        title: language === 'en' ? 'Skills & Multi-Domain Expertise | MTB Labs' : 'Habilidades y Campos Laborales | MTB Labs',
        back: language === 'en' ? 'Back' : 'Volver',
        ready: language === 'en' ? 'Ready to elevate your company’s digital product?' : '¿Listos para llevar el producto digital de tu empresa al siguiente nivel?',
        connect: language === 'en' ? 'María Tavera combines 14+ years of technical mastery and design thinking to deliver high-performance enterprise web apps.' : 'María Tavera combina más de 14 años de maestría técnica y diseño centrado en el usuario para crear aplicaciones web empresariales de alto rendimiento.',
        contact: language === 'en' ? 'Contact María Tavera' : 'Contactar a María Tavera',
    };

    return (
        <div className="w-full max-w-4xl mx-auto h-full flex flex-col">
            <div className="flex-none flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t.title}</h2>
                <button
                    onClick={onBack}
                    aria-label={t.back}
                    className="bg-white/10 hover:bg-white/20 text-slate-900 transition-all rounded-full p-2 flex items-center gap-2 px-4 shadow-sm border border-white/20 backdrop-blur-md cursor-pointer"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    <span className="text-sm font-medium">{t.back}</span>
                </button>
            </div>

            <div ref={scrollRef} className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pb-4 custom-scrollbar pr-2">
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`rounded-glass-md p-6 glass-panel border border-white/40 shadow-sm relative overflow-hidden flex flex-col justify-between`}
                    >
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${category.color} bg-opacity-50`}>
                                    <span className="material-symbols-outlined text-2xl opacity-80">{category.icon}</span>
                                </div>
                                <h3 className="font-bold text-slate-900 text-lg">
                                    {language === 'es' ? category.titleEs : category.title}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/40 text-slate-700 border border-white/60 shadow-2xs hover:bg-white/70 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-2 rounded-glass-md p-8 glass-panel border border-white/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/20 mt-2"
                >
                    <div className="max-w-md">
                        <h4 className="font-bold text-slate-900 text-lg mb-2">{t.ready}</h4>
                        <p className="text-slate-600 text-sm">{t.connect}</p>
                    </div>
                    <a
                        href="mailto:mt.developerdesigner@gmail.com"
                        className="px-6 py-3 rounded-glass-sm bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shrink-0 text-sm uppercase tracking-wider"
                    >
                        <span className="material-symbols-outlined text-base">mail</span>
                        {t.contact}
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
