"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface SubProject {
    title: string;
    description: string;
    icon: string;
    href: string;
    gradient: string;
}

interface ProjectPageProps {
    title: string;
    subtitle?: string;
    description: string;
    role: string;
    technologies?: string[];
    features?: Feature[];
    subProjects?: SubProject[];
    liveUrl?: string;
    images?: { src: string; alt: string }[];
    backHref: string;
    backLabel: string;
    accentColor: string;
    heroGradient: string;
    metrics?: { value: string; label: string }[];
    children?: React.ReactNode;
}

export default function ProjectPage({
    title,
    subtitle,
    description,
    role,
    technologies,
    features,
    subProjects,
    liveUrl,
    images,
    backHref,
    backLabel,
    accentColor,
    heroGradient,
    metrics,
    children,
}: ProjectPageProps) {
    return (
        <div className="min-h-screen relative z-10">
            {/* Navigation */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 p-4"
            >
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link
                        href={backHref}
                        className="glass-panel rounded-full px-5 py-2.5 flex items-center gap-2 hover:bg-white/40 transition-all group text-sm font-medium text-slate-800"
                    >
                        <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
                            arrow_back
                        </span>
                        {backLabel}
                    </Link>
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-panel rounded-full px-5 py-2.5 flex items-center gap-2 hover:bg-white/40 transition-all text-sm font-medium text-slate-800"
                        >
                            <span className="material-symbols-outlined text-lg">open_in_new</span>
                            Ver Proyecto
                        </a>
                    )}
                </div>
            </motion.nav>

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="pt-28 pb-16 px-4"
            >
                <div className="max-w-6xl mx-auto">
                    <div
                        className="rounded-glass-lg overflow-hidden relative bg-white border border-slate-200/60 shadow-sm"
                    >
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl bg-petite-orchid/30" />
                            <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full blur-3xl bg-cold-purple/20" />
                        </div>
                        
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-10 items-stretch">
                            {/* Left Text Content - 60% */}
                            <div className={images && images.length > 0 ? "col-span-1 lg:col-span-6 p-8 md:p-16 flex flex-col justify-center" : "col-span-1 lg:col-span-10 p-8 md:p-16"}>
                                {subtitle && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-slate-400 text-xs uppercase tracking-[0.3em] font-bold mb-4"
                                    >
                                        {subtitle}
                                    </motion.p>
                                )}
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
                                >
                                    {title}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-slate-600 text-lg md:text-xl max-w-3xl leading-relaxed"
                                >
                                    {description}
                                </motion.p>
                            </div>

                            {/* Right Image Content - 40% */}
                            {images && images.length > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="col-span-1 lg:col-span-4 relative min-h-[300px] lg:min-h-full overflow-hidden"
                                >
                                    <Image
                                        src={images[0].src}
                                        alt={images[0].alt}
                                        fill
                                        className="object-contain object-center"
                                        priority
                                        unoptimized
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Tags below the main card */}
                    {(role || (technologies && technologies.length > 0)) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 flex flex-wrap gap-3 items-center"
                        >
                            {role && (
                                <span 
                                    className="px-4 py-2 rounded-full bg-white/80 text-slate-800 text-xs font-bold uppercase tracking-wider border border-white/60 backdrop-blur-md shadow-sm flex items-center gap-2"
                                >
                                    <span 
                                        className="w-2.5 h-2.5 rounded-full shrink-0 bg-petite-orchid" 
                                    />
                                    {role}
                                </span>
                            )}
                            {technologies?.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 rounded-full bg-white/60 text-slate-700 text-xs font-bold uppercase tracking-wider border border-white/40 backdrop-blur-md shadow-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </motion.div>
                    )}
                </div>
            </motion.section>

            {/* Metrics */}
            {metrics && metrics.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pb-16 px-4"
                >
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {metrics.map((metric, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + i * 0.1 }}
                                    className="glass-panel rounded-glass-md p-6 text-center"
                                >
                                    <div
                                        className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-petite-orchid"
                                    >
                                        {metric.value}
                                    </div>
                                    <div className="text-slate-600 text-sm font-medium">{metric.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            )}

            {/* Sub Projects Grid */}
            {subProjects && subProjects.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="pb-16 px-4"
                >
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight">
                            Productos & Subproyectos
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subProjects.map((sp, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 + i * 0.1 }}
                                >
                                    <Link
                                        href={sp.href}
                                        className="group block glass-panel rounded-glass-md overflow-hidden hover:shadow-lg transition-all duration-500 h-full"
                                    >
                                        <div
                                            className="h-1 w-full bg-gradient-to-r from-petite-orchid/40 via-cold-purple/30 to-transparent"
                                        />
                                        <div className="p-6">
                                            <div
                                                className="w-14 h-14 rounded-glass-sm flex items-center justify-center mb-5 transition-transform group-hover:scale-110 bg-white/80 border border-slate-100 shadow-sm"
                                            >
                                                <span className="material-symbols-outlined text-2xl text-petite-orchid">
                                                    {sp.icon}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight group-hover:text-slate-700 transition-colors">
                                                {sp.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                                {sp.description}
                                            </p>
                                            <div className="flex items-center text-sm font-bold text-petite-orchid">
                                                Ver detalles
                                                <span className="material-symbols-outlined ml-2 text-lg group-hover:translate-x-1 transition-transform">
                                                    arrow_forward
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            )}

            {/* Features */}
            {features && features.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="pb-16 px-4"
                >
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight">
                            Características
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 + i * 0.1 }}
                                    className="glass-panel rounded-glass-md p-6"
                                >
                                    <div
                                        className="w-12 h-12 rounded-glass-sm flex items-center justify-center mb-4 bg-white/80 border border-slate-100 shadow-sm"
                                    >
                                        <span
                                            className="material-symbols-outlined text-xl text-petite-orchid"
                                        >
                                            {feature.icon}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            )}



            {/* Custom children */}
            {children}

            {/* Footer CTA */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pb-20 px-4"
            >
                <div className="max-w-6xl mx-auto">
                    <div className="glass-panel rounded-glass-lg p-8 md:p-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                            ¿Te gustaría saber cómo fue el proceso para realizar este proyecto?
                        </h2>
                        <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                            Si quieres saber más sobre este proyecto o conversar sobre cómo puedo ayudarte, no dudes en contactarme.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {liveUrl && (
                                <a
                                    href={liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3 rounded-full text-white font-bold text-sm tracking-wide transition-all hover:scale-105 hover:shadow-lg bg-gradient-to-r from-slate-800 to-slate-600"
                                >
                                    Ver Proyecto Live
                                </a>
                            )}
                            <Link
                                href={backHref}
                                className="px-8 py-3 rounded-full bg-slate-900/5 text-slate-900 font-bold text-sm tracking-wide hover:bg-slate-900/10 transition-all"
                            >
                                ← Volver
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
