"use client";

import ProjectPage from "@/components/ProjectPage";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const mockupGallery = [
    {
        src: "/santuario/mockup-sos.png",
        alt: "SOS — Regulación Emocional",
        title: "SOS de Regulación",
        desc: "Herramientas interactivas de calma inmediata, grounding y acompañamiento en crisis.",
        span: "col-span-1 row-span-1",
    },
    {
        src: "/santuario/mockup-login.png",
        alt: "Login — Bienvenida",
        title: "Bienvenida Segura",
        desc: "Pantalla de inicio con diseño inmersivo, sin presiones ni culpa.",
        span: "col-span-1 row-span-2",
    },
    {
        src: "/santuario/mockup-chat-ia.png",
        alt: "Chat IA — Compañera Empática",
        title: "Compañera IA",
        desc: "Chat empático potenciado por Inteligencia Artificial para contención emocional.",
        span: "col-span-1 row-span-1",
    },
    {
        src: "/santuario/mockup-diario.jpg",
        alt: "Diario — Tu espacio para soltar",
        title: "Diario Personal",
        desc: "Espacio seguro para registrar emociones con análisis autónomo.",
        span: "col-span-1 row-span-2",
    },
    {
        src: "/santuario/mockup-ajustes.png",
        alt: "Ajustes — Tu santuario, a tu medida",
        title: "Ajustes Personalizados",
        desc: "Control total de sonidos, animaciones, haptics e idioma.",
        span: "col-span-1 row-span-1",
    },
    {
        src: "/santuario/home.png",
        alt: "Dashboard — Vista principal",
        title: "Dashboard & SOS",
        desc: "Acceso instantáneo a la regulación emocional desde la pantalla principal.",
        span: "col-span-1 row-span-1",
    },
    {
        src: "/santuario/exercises.png",
        alt: "Ejercicios — Herramientas de Apoyo",
        title: "Herramientas de Apoyo",
        desc: "Ejercicios de grounding, respiración y sonido inmersivo.",
        span: "col-span-1 row-span-1",
    },
    {
        src: "/santuario/chat-ia.png",
        alt: "Chat IA — Pantalla completa",
        title: "Chat IA (App)",
        desc: "Interfaz limpia de conversación con la compañera de IA.",
        span: "col-span-1 row-span-1",
    },
    {
        src: "/santuario/diary.png",
        alt: "Diario — Registro emocional",
        title: "Diario (App)",
        desc: "Registro diario suave de emociones e introspección.",
        span: "col-span-1 row-span-1",
    },
    {
        src: "/santuario/settings.png",
        alt: "Ajustes — Pantalla completa",
        title: "Ajustes (App)",
        desc: "Personalización de la experiencia a detalle.",
        span: "col-span-1 row-span-1",
    },
];

export default function SantuarioContent() {
    const [lightbox, setLightbox] = useState<number | null>(null);

    return (
        <ProjectPage
            title="Santuario App"
            subtitle="UI/UX Design & Front-end Development"
            description="Aplicación móvil de regulación emocional y bienestar mental diseñada para ayudar a personas que experimentan ansiedad, sobrecarga emocional, estrés o crisis. Prioriza la calma, la contención emocional y la reducción de carga cognitiva a través de una experiencia inmersiva, elegante y humanizada."
            role="Diseño UI/UX & Desarrollo"
            technologies={["React", "Vite", "TanStack Router", "Tailwind CSS", "TypeScript"]}
            liveUrl="https://santuario-app-sigma.vercel.app/"
            backHref="/"
            backLabel="Volver al Portafolio"
            accentColor="#c9a0a0"
            heroGradient="linear-gradient(135deg, #1e1b2e 0%, #2d2640 40%, #3b3455 70%, #4a4268 100%)"
            features={[
                {
                    icon: "warning",
                    title: "SOS de Regulación",
                    description: "Herramientas SOS interactivas de respiración y grounding para estabilizar emocionalmente en momentos de crisis."
                },
                {
                    icon: "edit_note",
                    title: "Diario Inteligente",
                    description: "Registro diario suave de emociones con análisis autónomo para facilitar la introspección y autoconsciencia."
                },
                {
                    icon: "chat_bubble",
                    title: "Acompañamiento IA",
                    description: "Compañero empático con inteligencia artificial que brinda contención y respuestas guiadas ante la sobrecarga mental."
                },
                {
                    icon: "air",
                    title: "Recursos de Grounding",
                    description: "Ejercicios de respiración y meditación diseñados con interfaces relajantes y un sonido inmersivo."
                },
                {
                    icon: "spa",
                    title: "Reducción Cognitiva",
                    description: "Diseño no invasivo ni punitivo, sin presiones de rachas (streaks) diarias ni mensajes de culpa."
                },
                {
                    icon: "contact_support",
                    title: "Soporte Profesional",
                    description: "Acceso rápido a ayuda profesional y directorio de psicólogos integrados para soporte a largo plazo."
                }
            ]}
            images={[
                {
                    src: "/santuario/mockup-sos.png",
                    alt: "Santuario App — SOS de Regulación Emocional"
                }
            ]}
        >
            {/* Mockup Gallery Grid */}
            <div className="max-w-6xl mx-auto px-4 pb-20 mt-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight">
                    Galería de Mockups
                </h2>

                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {mockupGallery.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + idx * 0.06 }}
                            className="break-inside-avoid group cursor-pointer"
                            onClick={() => setLightbox(idx)}
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={600}
                                    height={800}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                    unoptimized
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                                    <h3 className="text-white font-bold text-sm mb-1">{img.title}</h3>
                                    <p className="text-white/70 text-xs leading-relaxed">{img.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                        onClick={() => setLightbox(null)}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all text-white"
                        >
                            <span className="material-symbols-outlined text-2xl">close</span>
                        </button>

                        {/* Nav arrows */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + mockupGallery.length) % mockupGallery.length); }}
                            className="absolute left-4 md:left-8 z-[110] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all text-white"
                        >
                            <span className="material-symbols-outlined text-2xl">chevron_left</span>
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % mockupGallery.length); }}
                            className="absolute right-4 md:right-8 z-[110] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all text-white"
                        >
                            <span className="material-symbols-outlined text-2xl">chevron_right</span>
                        </button>

                        {/* Image */}
                        <motion.div
                            key={lightbox}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            className="max-w-3xl w-full max-h-[85vh] flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full flex justify-center">
                                <Image
                                    src={mockupGallery[lightbox].src}
                                    alt={mockupGallery[lightbox].alt}
                                    width={900}
                                    height={1200}
                                    className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl"
                                    unoptimized
                                />
                            </div>
                            <div className="mt-6 text-center">
                                <h3 className="text-white font-bold text-lg mb-1">{mockupGallery[lightbox].title}</h3>
                                <p className="text-white/60 text-sm max-w-md">{mockupGallery[lightbox].desc}</p>
                                <p className="text-white/30 text-xs mt-3">{lightbox + 1} / {mockupGallery.length}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Case Study Section: Problema · Usuario · Solución · Resultado */}
            <div className="max-w-6xl mx-auto px-4 pb-20 mt-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                        Caso de Estudio
                    </h2>
                    <p className="text-slate-500 text-sm mb-10 max-w-2xl leading-relaxed">
                        Un recorrido por el análisis del problema, la comprensión del usuario, la propuesta de solución y los resultados obtenidos.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            icon: "report_problem",
                            label: "Problema",
                            color: "from-rose-500/10 to-rose-500/5",
                            borderColor: "border-rose-200/60",
                            iconBg: "bg-rose-50",
                            iconColor: "text-rose-400",
                            content: "Las aplicaciones de salud mental actuales tienden a ser punitivas (rachas, notificaciones culpabilizantes), generan sobrecarga cognitiva y no ofrecen contención real en momentos de crisis emocional. Muchas personas con ansiedad las abandonan porque sienten que son \"una tarea más\"."
                        },
                        {
                            icon: "person_search",
                            label: "Usuario",
                            color: "from-blue-500/10 to-blue-500/5",
                            borderColor: "border-blue-200/60",
                            iconBg: "bg-blue-50",
                            iconColor: "text-blue-400",
                            content: "Personas de 18 a 40 años que experimentan ansiedad, sobrecarga emocional o estrés recurrente. Buscan herramientas de regulación emocional inmediata, sin presiones externas, y valoran un espacio privado, seguro y no invasivo para procesar sus emociones."
                        },
                        {
                            icon: "lightbulb",
                            label: "Solución",
                            color: "from-amber-500/10 to-amber-500/5",
                            borderColor: "border-amber-200/60",
                            iconBg: "bg-amber-50",
                            iconColor: "text-amber-500",
                            content: "Santuario App: una aplicación inmersiva de regulación emocional que combina un botón SOS con técnicas de grounding y respiración, un diario inteligente con análisis autónomo, un acompañante empático de IA, y un diseño de baja carga cognitiva. Sin rachas, sin culpa, sin presiones."
                        },
                        {
                            icon: "trending_up",
                            label: "Resultado",
                            color: "from-emerald-500/10 to-emerald-500/5",
                            borderColor: "border-emerald-200/60",
                            iconBg: "bg-emerald-50",
                            iconColor: "text-emerald-500",
                            content: "Una experiencia digital que prioriza la calma sobre la productividad. Interfaz validada con usuarios reales que reportaron menor resistencia al uso, mayor sensación de seguridad emocional y un diseño que \"se siente como un refugio, no como una obligación\"."
                        },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            className={`rounded-2xl bg-gradient-to-br ${item.color} border ${item.borderColor} p-6 md:p-8`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                                    <span className={`material-symbols-outlined text-xl ${item.iconColor}`}>{item.icon}</span>
                                </div>
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{item.label}</span>
                            </div>
                            <p className="text-slate-700 text-sm leading-relaxed">{item.content}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Design Process Section */}
            <div className="max-w-6xl mx-auto px-4 pb-20">
                <div className="rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/60 shadow-sm p-8 md:p-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                        Proceso de Diseño
                    </h2>
                    <p className="text-slate-500 text-sm mb-12 max-w-2xl leading-relaxed">
                        Cada etapa del proceso fue guiada por la empatía con el usuario y la validación continua, desde la comprensión estratégica hasta el diseño final.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Vertical line connector (desktop) */}
                    <div className="hidden md:block absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-slate-200 via-slate-300/50 to-transparent" />

                    <div className="space-y-6">
                        {[
                            {
                                step: "01",
                                title: "Entender objetivos del negocio",
                                description: "Análisis de la visión del producto, el mercado de salud mental digital y la diferenciación competitiva. Definición de los KPIs emocionales y funcionales que guiarían el diseño.",
                                icon: "domain",
                            },
                            {
                                step: "02",
                                title: "Conocer usuarios",
                                description: "Entrevistas a profundidad con personas que experimentan ansiedad y sobrecarga emocional. Creación de arquetipos de usuario con base en patrones de comportamiento, necesidades y frustraciones reales.",
                                icon: "groups",
                            },
                            {
                                step: "03",
                                title: "Investigación",
                                description: "Benchmark de apps de salud mental (Calm, Headspace, Woebot). Investigación sobre diseño sensorial, psicología del color en contextos emocionales y principios de diseño de baja carga cognitiva.",
                                icon: "search_insights",
                            },
                            {
                                step: "04",
                                title: "Definir problemas",
                                description: "Mapeo de pain points: rachas punitivas, culpa por no usar la app, interfaces frías y clínicas. Formulación de los HMW (How Might We) que guiarían la ideación de soluciones.",
                                icon: "target",
                            },
                            {
                                step: "05",
                                title: "Wireframes",
                                description: "Sketches de baja fidelidad priorizando flujos de crisis (SOS), acompañamiento (IA) y registro emocional (Diario). Arquitectura de la información con navegación simplificada al máximo.",
                                icon: "draw",
                            },
                            {
                                step: "06",
                                title: "Prototipos",
                                description: "Prototipos interactivos de alta fidelidad con micro-interacciones sensoriales: haptics simulados, transiciones suaves, paletas de color cálidas y tipografía humanizada.",
                                icon: "devices",
                            },
                            {
                                step: "07",
                                title: "Validación",
                                description: "Testing con usuarios reales en escenarios de estrés simulado. Iteración basada en feedback cualitativo sobre la percepción de seguridad, calma y usabilidad del producto.",
                                icon: "fact_check",
                            },
                            {
                                step: "08",
                                title: "Diseño final",
                                description: "Entrega del sistema de diseño completo: componentes reutilizables, guías de tono emocional, tokens de diseño y especificaciones de desarrollo para la implementación en React + TypeScript.",
                                icon: "palette",
                            },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + idx * 0.08 }}
                                className="flex gap-5 md:gap-8 items-start group"
                            >
                                {/* Step number circle */}
                                <div className="flex-none relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:border-slate-300/80 transition-all duration-300">
                                        <span className="material-symbols-outlined text-xl text-slate-400 group-hover:text-petite-orchid transition-colors duration-300">
                                            {item.icon}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 pb-2">
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                                            Paso {item.step}
                                        </span>
                                    </div>
                                    <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1.5 tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                </div>
            </div>

            {/* Proceso de Creación — External Links */}
            <div className="max-w-6xl mx-auto px-4 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                        Proceso de Creación
                    </h2>
                    <p className="text-slate-500 text-sm mb-10 max-w-2xl leading-relaxed">
                        Explora la documentación completa del proceso: desde el caso de estudio hasta la arquitectura de flujos y la gestión del proyecto.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                        {
                            title: "Case Study",
                            description: "Análisis completo del diseño, investigación de usuario y decisiones estratégicas del proyecto.",
                            icon: "auto_stories",
                            href: "https://walk-stylus-54756902.figma.site/",
                            gradient: "from-violet-500/10 to-purple-500/5",
                            borderColor: "border-violet-200/60",
                            iconBg: "bg-violet-50",
                            iconColor: "text-violet-500",
                            hoverShadow: "hover:shadow-violet-200/40",
                        },
                        {
                            title: "Flowchart",
                            description: "Mapa de navegación y flujos de usuario de toda la aplicación en FigJam.",
                            icon: "account_tree",
                            href: "https://www.figma.com/board/cHZunQ0l7yRnqA525olxgq/Santuario-App-Flow-Chart?node-id=1-2&t=NhunHbWnCj9Xnp1c-1",
                            gradient: "from-sky-500/10 to-cyan-500/5",
                            borderColor: "border-sky-200/60",
                            iconBg: "bg-sky-50",
                            iconColor: "text-sky-500",
                            hoverShadow: "hover:shadow-sky-200/40",
                        },
                        {
                            title: "Notion",
                            description: "Documentación del proyecto, gestión de tareas y seguimiento del desarrollo.",
                            icon: "description",
                            href: "https://app.notion.com/p/App-Santuario-36d95f9151c8803cbf4ee00eb854c5b7",
                            gradient: "from-stone-500/10 to-neutral-500/5",
                            borderColor: "border-stone-200/60",
                            iconBg: "bg-stone-50",
                            iconColor: "text-stone-600",
                            hoverShadow: "hover:shadow-stone-200/40",
                        },
                    ].map((link, idx) => (
                        <motion.a
                            key={idx}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            className={`group rounded-2xl bg-gradient-to-br ${link.gradient} border ${link.borderColor} p-6 md:p-8 transition-all duration-300 hover:shadow-xl ${link.hoverShadow} hover:-translate-y-1`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-11 h-11 rounded-xl ${link.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                    <span className={`material-symbols-outlined text-xl ${link.iconColor}`}>{link.icon}</span>
                                </div>
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight">
                                {link.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-4">
                                {link.description}
                            </p>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-slate-600 transition-colors duration-300">
                                <span>Ver documento</span>
                                <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </ProjectPage>
    );
}
