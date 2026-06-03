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
        </ProjectPage>
    );
}
