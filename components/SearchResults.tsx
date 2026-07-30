"use client";

import { experiences } from "./Experience";
import { skillCategories } from "./Skills";
import { getProjects } from "@/data/projectsData";
import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface SearchResultsProps {
    query: string;
    onBack: () => void;
    language?: 'en' | 'es';
}

export default function SearchResults({ query, onBack, language = 'en' }: SearchResultsProps) {
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
    }, [query]);

    const { matchedExperiences, matchedSkills, matchedProjects } = useMemo(() => {
        if (!query) {
            return { matchedExperiences: [], matchedSkills: [], matchedProjects: [] };
        }

        const lowerQuery = query.toLowerCase();
        const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 2);

        // Match Experiences
        const expMatches = experiences.filter((exp) => {
            const description = language === 'en' ? exp.description : (exp.descriptionEs || exp.description);
            const role = language === 'en' ? exp.role : (exp.roleEs || exp.role);

            const text = `${role} ${exp.company} ${description.join(" ")}`.toLowerCase();
            return queryWords.some(word => text.includes(word)) || text.includes(lowerQuery);
        });

        // Match Skills
        const skillMatches: { category: string; skills: string[] }[] = [];
        skillCategories.forEach((cat) => {
            const title = language === 'en' ? cat.title : (cat.titleEs || cat.title);
            const catMatches = cat.skills.filter((skill) => {
                return queryWords.some(word => skill.toLowerCase().includes(word)) || skill.toLowerCase().includes(lowerQuery);
            });

            if (catMatches.length > 0) {
                skillMatches.push({ category: title, skills: catMatches });
            } else if (title.toLowerCase().includes(lowerQuery)) {
                skillMatches.push({ category: title, skills: cat.skills.slice(0, 5) });
            }
        });

        // Match Projects
        const localizedProjects = getProjects(language);
        const projectMatches = localizedProjects.filter((proj) => {
            const text = `${proj.title} ${proj.category} ${proj.description}`.toLowerCase();
            return queryWords.some(word => text.includes(word)) || text.includes(lowerQuery);
        });

        return {
            matchedExperiences: expMatches,
            matchedSkills: skillMatches,
            matchedProjects: projectMatches,
        };
    }, [query, language]);

    const hasResults = matchedExperiences.length > 0 || matchedSkills.length > 0 || matchedProjects.length > 0;

    const t = {
        titleMatch: language === 'en' ? "Why Maria is the Perfect Fit" : "Por qué María es la indicada",
        titleNoMatch: language === 'en' ? "Let's Connect" : "Conectemos",
        back: language === 'en' ? "Back" : "Volver",
        bannerMatch: language === 'en' ? `Great news! I have experience with "${query}"` : `¡Buenas noticias! Tengo experiencia con "${query}"`,
        bannerNoMatch: language === 'en' ? `I couldn't find a direct match for "${query}", but I love new challenges!` : `No encontré coincidencias directas para "${query}", ¡pero amo los nuevos retos!`,
        descMatch: language === 'en'
            ? "My portfolio clearly demonstrates the skills and experience you're looking for. Here is a breakdown of how my background aligns with your needs."
            : "Mi portafolio demuestra claramente las habilidades y experiencia que buscas. Aquí hay un desglose de cómo mi trayectoria se alinea con tus necesidades.",
        descNoMatch: language === 'en'
            ? "While my portfolio doesn't explicitly mention this, my background in UI/UX and Frontend Development has equipped me with adaptable problem-solving skills. Let's discuss how I can help you achieve your goals."
            : "Aunque mi portafolio no lo menciona explícitamente, mi experiencia en UI/UX y Desarrollo Frontend me ha dado habilidades adaptables. Hablemos de cómo puedo ayudarte a lograr tus metas.",
        skillsTitle: language === 'en' ? "Relevant Skills" : "Habilidades Relevantes",
        expTitle: language === 'en' ? "Relevant Experience" : "Experiencia Relevante",
        projTitle: language === 'en' ? "Related Projects" : "Proyectos Relacionados",
        ready: language === 'en' ? "Ready to start?" : "¿Listo para empezar?",
        readyDescMatch: language === 'en' ? "My background is a strong match for what you need. Let's create something amazing together." : "Mi perfil encaja muy bien con lo que necesitas. Creemos algo increíble juntos.",
        readyDescNoMatch: language === 'en' ? "I'm always eager to learn and adapt. Let's chat about your specific requirements." : "Siempre estoy dispuesta a aprender y adaptarme. Hablemos de tus requerimientos específicos.",
        contact: language === 'en' ? "Get in Touch" : "Contáctame"
    };

    return (
        <div className="w-full max-w-4xl mx-auto h-full flex flex-col relative z-20">
            <div className="flex-none flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                    {hasResults ? t.titleMatch : t.titleNoMatch}
                </h2>
                <button
                    onClick={onBack}
                    className="bg-white/10 hover:bg-white/20 text-slate-900 transition-all rounded-full p-2 flex items-center gap-2 px-4 shadow-sm border border-white/20 backdrop-blur-md"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    <span className="text-sm font-medium">{t.back}</span>
                </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto pr-4 pb-4 custom-scrollbar space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel rounded-glass-md p-8 text-center bg-white/5 border border-white/20 shadow-sm"
                >
                    <div className="w-16 h-16 rounded-full bg-petite-orchid/20 flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-3xl text-petite-orchid">
                            {hasResults ? "verified" : "handshake"}
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {hasResults ? t.bannerMatch : t.bannerNoMatch}
                    </h3>
                    <p className="text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        {hasResults ? t.descMatch : t.descNoMatch}
                    </p>
                </motion.div>

                {matchedSkills.length > 0 && (
                    <section>
                        <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-cold-purple">psychology</span>
                            {t.skillsTitle}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {matchedSkills.map((match, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="glass-panel rounded-glass-sm p-4 border border-white/30 bg-white/5"
                                >
                                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{match.category}</div>
                                    <div className="flex flex-wrap gap-2">
                                        {match.skills.map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-cold-purple/10 text-cold-purple-dark rounded-full text-sm font-medium border border-cold-purple/20">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {matchedExperiences.length > 0 && (
                    <section>
                        <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-petite-orchid">work_history</span>
                            {t.expTitle}
                        </h4>
                        <div className="space-y-4">
                            {matchedExperiences.map((exp, idx) => {
                                const role = language === 'en' ? exp.role : (exp.roleEs || exp.role);
                                const period = language === 'en' ? exp.period : (exp.periodEs || exp.period);
                                const description = language === 'en' ? exp.description : (exp.descriptionEs || exp.description);
                                return (
                                    <motion.div
                                        key={exp.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + (idx * 0.1) }}
                                        className="glass-panel rounded-glass-sm p-6 border border-white/30 bg-white/5 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-5">
                                            <span className="text-6xl font-black leading-none tracking-tighter mix-blend-overlay">EXP</span>
                                        </div>
                                        <h5 className="text-lg font-bold text-slate-900">{role}</h5>
                                        <div className="text-slate-600 font-medium text-sm mb-3">{exp.company} • {period}</div>
                                        <ul className="space-y-2">
                                            {description.slice(0, 2).map((desc, i) => (
                                                <li key={i} className="text-slate-700 text-sm flex gap-2">
                                                    <span className="text-petite-orchid mt-1.5 min-w-[4px] h-[4px] rounded-full block bg-current"></span>
                                                    {desc}
                                                </li>
                                            ))}
                                            {description.length > 2 && (
                                                <li className="text-slate-500 text-xs italic pl-3">...and more customized contributions.</li>
                                            )}
                                        </ul>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {matchedProjects.length > 0 && (
                    <section>
                        <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-rock-blue">grid_view</span>
                            {t.projTitle}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {matchedProjects.map((project, idx) => (
                                <Link
                                    key={project.id}
                                    href={project.internalLink || project.link}
                                    className="group rounded-glass-sm overflow-hidden glass-panel border border-white/30 shadow-sm hover:shadow-md transition-all cursor-pointer block bg-white/5"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + (idx * 0.1) }}
                                    >
                                        <div className="h-40 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all z-10" />
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                unoptimized
                                            />
                                            <div className="absolute top-2 left-2 z-20">
                                                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 text-slate-900 rounded-full shadow-sm">
                                                    {project.category.split(',')[0]}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h5 className="text-sm font-bold text-slate-900 mb-1 line-clamp-1">{project.title}</h5>
                                            <p className="text-slate-600 text-xs line-clamp-2">{project.description}</p>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <div className="mt-8 p-8 rounded-glass-md glass-panel border border-white/40 shadow-lg text-center bg-gradient-to-br from-slate-900/5 to-petite-orchid/5">
                    <h4 className="text-xl font-bold text-slate-900 mb-3">{t.ready}</h4>
                    <p className="text-slate-700 mb-6 max-w-lg mx-auto">
                        {hasResults ? t.readyDescMatch : t.readyDescNoMatch}
                    </p>
                    <a
                        href="mailto:mt.developerdesigner@gmail.com"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                        <span className="material-symbols-outlined">mail</span>
                        {t.contact}
                    </a>
                </div>
            </div>
        </div>
    );
}
