"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string[];
}

const experiences: ExperienceItem[] = [
    {
        id: "1",
        role: "UI/UX Designer, Frontend Developer & Graphic Designer - Leader",
        company: "TIENDAPP SAS",
        period: "October 2022 – Currently",
        description: [
            "Directed the UI/UX strategy, conducting exhaustive research and analysis to inform design decisions, increasing customer satisfaction levels.",
            "Drastically optimized web load times and improved App performance with React Native and reusable components, elevating code maintainability.",
            "Established and assisted in creating corporate UX/UI guides, fostering cohesion and a high standard of experience across products.",
            "Facilitated alignment between business goals and engineering objectives, technically leading all phases of the product life cycle.",
        ],
    },
    {
        id: "2",
        role: "Frontend Developer, UI-UX Designer - Leader",
        company: "Alpina - JULIUS CONNECTED 2 GROW",
        period: "March 2020 – February 2022",
        description: [
            "Coded and managed sites using HTML, CSS, JavaScript, and jQuery, providing front-end support with visually appealing designs.",
            "Enhanced the user experience by implementing responsive web design and optimizing site performance, complying with SEO best practices.",
            "Led portal management (Webmaster) and developed custom web applications, resolving technical issues promptly to minimize interruptions.",
            "Ensured the visual and technical alignment of platforms with brand standards, providing design and front-end development support.",
        ],
    },
    {
        id: "3",
        role: "Frontend Developer & Web Designer",
        company: "SPROUTLOUD",
        period: "April 2019 – October 2019",
        description: [
            "Reduced load times and improved site speed through asset optimization (images, scripts), raising technical quality.",
            "Migrated websites to new platforms, collaborating with cross-functional teams to deliver high-quality products on time.",
            "Developed an exhaustive testing strategy to identify and fix usability issues, ensuring a seamless UX.",
            "Collaborated with multidisciplinary teams to successfully deliver high-quality web products, meeting defined timelines and budgets.",
        ],
    },
    {
        id: "4",
        role: "Content Manager Coordinator - Frontend Developer - Leader",
        company: "SAMSUNG",
        period: "September 2018 – April 2019",
        description: [
            "Increased sales by creating interactive content and UI/UX optimization on the product page.",
            "Led processes and projects, managing content calendars and collaborating with Design/Development to ensure on-brand content.",
            "Monitored web analytics and metrics to track content performance and identify key areas for improvement.",
            "Approved, reviewed, and edited key content before publication.",
        ],
    },
    {
        id: "5",
        role: "Frontend Developer, UI-UX Designer, Graphic Designer & Webmaster",
        company: "ITA LATAM, EL COLOMBIANO and GRUPO ÉXITO",
        period: "February 2015 – September 2018",
        description: [
            "Specialized in WordPress, with expertise in web design, programming, and webmastering.",
            "Created strategies for social media and audiovisual production, complementing technical skills with marketing and interactive design.",
            "Designed and programmed digital content, complementing web design with audiovisual production and social media strategy creation.",
        ],
    },
    {
        id: "6",
        role: "Frontend Developer, Graphic Designer, Multimedia Producer & Webmaster",
        company: "MIGUELO ROMANO (GITP) and LINKAPEDIA",
        period: "September 2013 – September 2014",
        description: [
            "Participated in the UX - UI Design area, laying the groundwork for a user-centric vision.",
            "Contributed to audiovisual production and community management areas, complementing design skills.",
            "Developed customer service and community management skills, combining technical proficiency with a user focus.",
        ],
    },
    {
        id: "7",
        role: "Graphic Designer",
        company: "GEA COLOMBIA and CORDESARROLLO",
        period: "August 2013 – March 2014",
        description: [
            "Experienced in designing educational books and advertising material.",
            "Created digital content for social media, strengthening communication and brand presence.",
            "Created advertising material and designed educational books, ensuring visual coherence in high-value communication.",
        ],
    },
    {
        id: "8",
        role: "E-PUB Developer",
        company: "YUXI GLOBAL",
        period: "December 2012 – April 2013",
        description: [
            "Programmed E-books (E-pub) oriented towards mobile devices, demonstrating skill in adapting digital content.",
            "Mastered programming tools to achieve a successful final product delivery in the digital environment.",
            "Demonstrated competency in the precise programming of E-books for smooth distribution across various mobile devices.",
        ],
    },
];

const education = [
    {
        id: "edu1",
        degree: "Digital Marketing",
        institution: "EAFIT University / Diploma",
        year: "2022",
    },
    {
        id: "edu2",
        degree: "Advertising",
        institution: "Universidad Católica Luis Amigó / Bachelor",
        year: "2021",
    },
    {
        id: "edu3",
        degree: "Multimedia Production",
        institution: "SENA / Bachelor",
        year: "2014",
    },
];

export default function Experience({ onBack }: { onBack: () => void }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto h-full flex flex-col">
            <div className="flex-none flex items-center justify-between mb-8 relative z-10">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Experience</h2>
                <button
                    onClick={onBack}
                    className="bg-white/10 hover:bg-white/20 text-slate-900 transition-all rounded-full p-2 flex items-center gap-2 px-4 shadow-sm border border-white/20 backdrop-blur-md"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    <span className="text-sm font-medium">Back</span>
                </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto pr-4 pb-4 custom-scrollbar space-y-12">
                <section>
                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-8 border-l border-slate-300/50"
                            >
                                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-petite-orchid shadow-[0_0_10px_rgba(219,165,221,0.6)]" />
                                <div className="mb-1 text-sm font-bold tracking-wider text-petite-orchid uppercase">
                                    {exp.period}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1">
                                    {exp.role}
                                </h3>
                                <div className="text-lg text-slate-700 font-medium mb-4">{exp.company}</div>
                                <ul className="space-y-2">
                                    {exp.description.map((item, i) => (
                                        <li key={i} className="text-slate-600 leading-relaxed text-sm flex gap-2">
                                            <span className="text-slate-400 mt-1.5 min-w-[4px] h-[4px] bg-slate-400 rounded-full block"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight sticky top-[-10px] py-2">Education</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {education.map((edu, idx) => (
                            <div key={edu.id} className="p-4 rounded-glass-sm glass-panel bg-white/5 border border-white/20 shadow-sm relative overflow-hidden group hover:bg-white/10 transition-colors">
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-4xl text-slate-900">school</span>
                                </div>
                                <div className="text-xs font-bold text-slate-500 mb-1">{edu.year}</div>
                                <h4 className="font-bold text-slate-900">{edu.degree}</h4>
                                <div className="text-sm text-slate-600">{edu.institution}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
