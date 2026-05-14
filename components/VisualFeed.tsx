"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export const visuals = [
    { id: 1, image: "https://mir-s3-cdn-cf.behance.net/projects/404/10a7c3241831361.Y3JvcCwxNjI3LDEyNzIsMCwxNTQy.png", caption: "Playing around with shapes and colors" },
    { id: 2, image: "https://mir-s3-cdn-cf.behance.net/projects/404/2b234f241829125.Y3JvcCw0MzIwLDMzNzksMCww.jpg", caption: "Early sketches for UpCard branding" },
    { id: 3, image: "https://mir-s3-cdn-cf.behance.net/projects/404/e01900239353155.Y3JvcCwxMDgwLDg0NCwwLDIzMg.png", caption: "Digital textures and assets" },
    { id: 4, image: "https://mir-s3-cdn-cf.behance.net/projects/404/298ccc196617331.Y3JvcCwyODc4LDIyNTEsMCw1MzY0.png", caption: "Behind the scenes: E-commerce wireframes" },
    { id: 5, image: "https://mir-s3-cdn-cf.behance.net/projects/404/5aecf0185922065.Y3JvcCw0MjYxLDMzMzMsNTM3LDA.png", caption: "Color palette exploration for Mascothings" },
    { id: 6, image: "https://mir-s3-cdn-cf.behance.net/projects/404/28f2ce175337617.Y3JvcCwyMDE1LDE1NzYsMCww.png", caption: "Rethinking web aesthetics" }
];

export default function VisualFeed({ onBack, language = 'en' }: { onBack: () => void, language: 'en' | 'es' }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, []);

    const t = {
        title: language === 'en' ? 'Visual Feed' : 'Feed Visual',
        subtitle: language === 'en' ? 'Work I\'ve created and things that inspire me.' : 'Trabajo que he creado y cosas que me inspiran.',
        back: language === 'en' ? 'Back' : 'Volver',
    };

    return (
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
            <div className="flex-none flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t.title}</h2>
                    <p className="text-slate-600 mt-2">{t.subtitle}</p>
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
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {visuals.map((visual, index) => (
                        <motion.div
                            key={visual.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="break-inside-avoid group rounded-glass-md overflow-hidden glass-panel border border-white/30 shadow-sm transition-all"
                        >
                            <div className="relative w-full">
                                <img src={visual.image} alt={visual.caption} className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105" />
                                {visual.caption && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <p className="text-white text-sm font-medium">{visual.caption}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
