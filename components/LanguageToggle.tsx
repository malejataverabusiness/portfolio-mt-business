"use client";

import { motion } from "framer-motion";

interface LanguageToggleProps {
    language: 'en' | 'es';
    setLanguage: (lang: 'en' | 'es') => void;
}

export default function LanguageToggle({ language, setLanguage }: LanguageToggleProps) {
    return (
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${language === 'en'
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-700 hover:text-slate-900"
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${language === 'es'
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-700 hover:text-slate-900"
                    }`}
            >
                ES
            </button>
        </div>
    );
}
