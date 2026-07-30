"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/data/projectsData";

export default function Projects({ onBack, language = 'en' }: { onBack: () => void, language: 'en' | 'es' }) {
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
        title: language === 'en' ? 'Recent Projects' : 'Proyectos Recientes',
        back: language === 'en' ? 'Back' : 'Volver',
        view: language === 'en' ? 'View Project' : 'Ver Proyecto',
        featured: language === 'en' ? 'Featured' : 'Destacado',
    };

    return (
        <div className="w-full max-w-4xl mx-auto h-full flex flex-col">
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

            <div ref={scrollRef} className="flex-1 overflow-y-auto pb-4 custom-scrollbar pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getProjects(language).map((project, index) => {
                        const isFeatured = 'featured' in project && project.featured;
                        const hasInternal = 'internalLink' in project && project.internalLink;
                        
                        const cardContent = (
                            <>
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all z-10" />
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        unoptimized
                                    />
                                    <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                                        {isFeatured && (
                                            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cold-purple to-petite-orchid text-white rounded-full shadow-sm">
                                                ★ {t.featured}
                                            </span>
                                        )}
                                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/90 text-slate-900 rounded-full shadow-sm">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-petite-orchid transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="flex items-center text-sm font-bold text-slate-800">
                                        {t.view}
                                        <span className="material-symbols-outlined ml-2 text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </div>
                                </div>
                            </>
                        );

                        if (hasInternal) {
                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={(project as { internalLink?: string }).internalLink || '#'}
                                        className="group rounded-glass-md overflow-hidden glass-panel border border-white/30 shadow-sm hover:shadow-md transition-all cursor-pointer bg-white/10 block h-full"
                                    >
                                        {cardContent}
                                    </Link>
                                </motion.div>
                            );
                        }

                        return (
                            <motion.a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group rounded-glass-md overflow-hidden glass-panel border border-white/30 shadow-sm hover:shadow-md transition-all cursor-pointer bg-white/10 block h-full"
                            >
                                {cardContent}
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
