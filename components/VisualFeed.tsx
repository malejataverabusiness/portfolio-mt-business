"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/data/projectsData";

type ProjectItem = ReturnType<typeof getProjects>[number];

export default function VisualFeed({ onBack, language = 'en' }: { onBack: () => void, language: 'en' | 'es' }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

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
        title: language === 'en' ? 'Visual Feed' : 'Feed Visual',
        subtitle: language === 'en' 
            ? 'A visual curation of my digital designs, UI/UX solutions, and front-end development projects. Here you can explore summaries of my work, interactive experiences, and the creative details behind each interface. Click on any card to learn more.' 
            : 'Una curaduría visual de mis diseños digitales, soluciones de interfaz (UI/UX) y proyectos de desarrollo front-end. Explora resúmenes de mi trabajo, experiencias interactivas y los detalles creativos detrás de cada pantalla. Haz clic en cualquier tarjeta para ver más.',
        back: language === 'en' ? 'Back' : 'Volver',
        viewMore: language === 'en' ? 'View Project' : 'Ver Proyecto',
        close: language === 'en' ? 'Close' : 'Cerrar',
    };

    return (
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col relative">
            <div className="flex-none flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t.title}</h2>
                    <p className="text-slate-600 text-sm leading-relaxed mt-2">{t.subtitle}</p>
                </div>
                <button
                    onClick={onBack}
                    className="bg-white/10 self-start md:self-auto hover:bg-white/20 text-slate-900 transition-all rounded-full p-2 flex items-center gap-2 px-4 shadow-sm border border-white/20 backdrop-blur-md"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    <span className="text-sm font-medium">{t.back}</span>
                </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto pb-4 custom-scrollbar pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getProjects(language).map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group rounded-glass-md overflow-hidden glass-panel border border-white/30 shadow-sm transition-all cursor-pointer hover:shadow-md"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                    <span className="text-[9px] font-bold tracking-wider text-petite-orchid bg-petite-orchid/15 border border-petite-orchid/20 px-2 py-0.5 rounded-full uppercase self-start mb-2">
                                        {project.category}
                                    </span>
                                    <h4 className="text-white text-base font-bold mb-1">{project.title}</h4>
                                    <p className="text-white/70 text-xs line-clamp-2">{project.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />

                        {/* Content Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-2xl bg-white/85 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-900/10 hover:bg-slate-900/25 flex items-center justify-center text-slate-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>

                            {/* Image Part */}
                            <div className="relative w-full md:w-1/2 min-h-[200px] md:h-[400px] overflow-hidden bg-slate-100 flex-shrink-0">
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>

                            {/* Info Part */}
                            <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-900/5 px-3 py-1 rounded-full border border-slate-900/10">
                                        {selectedProject.category}
                                    </span>
                                    <h3 className="text-2xl font-black text-slate-900 mt-4 mb-3 tracking-tight">
                                        {selectedProject.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                        {selectedProject.description}
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <Link
                                        href={selectedProject.internalLink}
                                        className="flex-1 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm text-center tracking-wide transition-all shadow-md hover:shadow-lg hover:scale-102 flex items-center justify-center gap-2 group"
                                    >
                                        {t.viewMore}
                                        <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                                    </Link>
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="px-6 py-3 rounded-full bg-slate-900/5 hover:bg-slate-900/10 text-slate-900 font-bold text-sm tracking-wide transition-all"
                                    >
                                        {t.close}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
