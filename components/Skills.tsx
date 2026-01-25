"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const skillCategories = [
    {
        title: "Development",
        icon: "code",
        skills: [
            "React", "React Native", "HTML", "SASS", "JavaScript",
            "Git", "Responsive Design", "Performance Optimization",
            "Component Libraries", "Unit testing"
        ],
        color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
        title: "Design",
        icon: "design_services",
        skills: [
            "Figma", "Adobe XD", "Design Systems", "Prototyping",
            "Wireframing", "UX Research", "UI Guidelines",
            "Adobe Suite", "Atomic Design"
        ],
        color: "bg-purple-100 text-purple-800 border-purple-200",
    },
    {
        title: "Marketing & Strategy",
        icon: "trending_up",
        skills: [
            "WordPress", "Shopify", "E-commerce", "E-mail marketing",
            "SEO", "A/B Testing", "Elementor", "Divi", "Gutenberg"
        ],
        color: "bg-green-100 text-green-800 border-green-200",
    },
    {
        title: "Leadership",
        icon: "groups",
        skills: [
            "Technical Leadership", "UI/UX Strategy", "Team Mentorship",
            "Cross-functional Collaboration", "Project Management",
            "Business Alignment", "Stakeholder Management"
        ],
        color: "bg-rose-100 text-rose-800 border-rose-200",
    },
];

export default function Skills({ onBack }: { onBack: () => void }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto h-full flex flex-col">
            <div className="flex-none flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Skills & Expertise</h2>
                <button
                    onClick={onBack}
                    className="bg-white/10 hover:bg-white/20 text-slate-900 transition-all rounded-full p-2 flex items-center gap-2 px-4 shadow-sm border border-white/20 backdrop-blur-md"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    <span className="text-sm font-medium">Back</span>
                </button>
            </div>

            <div ref={scrollRef} className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pb-4 custom-scrollbar pr-2">
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`rounded-glass-md p-6 glass-panel border border-white/40 shadow-sm relative overflow-hidden`}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${category.color} bg-opacity-50`}>
                                <span className="material-symbols-outlined text-2xl opacity-80">{category.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/40 border border-white/30 text-slate-800 shadow-sm hover:bg-white/60 transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-2 rounded-glass-md p-6 glass-panel border border-white/40 shadow-sm flex flex-col md:flex-row items-center gap-8 justify-between bg-gradient-to-r from-petite-orchid/10 to-transparent"
                >
                    <div className="max-w-md">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to work together?</h3>
                        <p className="text-slate-700">I combine technical mastery with design thinking to build exceptional digital products.</p>
                    </div>
                    <a href="mailto:mt.developerdesigner@gmail.com" className="px-6 py-3 rounded-glass-sm bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg">
                        <span className="material-symbols-outlined">mail</span>
                        Contact Me
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
