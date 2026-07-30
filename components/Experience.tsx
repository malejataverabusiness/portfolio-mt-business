"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export interface ExperienceItem {
    id: string;
    role: string;
    roleEs?: string;
    company: string;
    period: string;
    periodEs?: string;
    description: string[];
    descriptionEs?: string[];
    tags?: string[];
}

export const experiences: ExperienceItem[] = [
    {
        id: "mtb-labs",
        role: "Senior Design Engineer (Product Designer & Frontend Engineer)",
        roleEs: "Diseñadora e Ingeniera de Software Senior (Product Design & Frontend)",
        company: "MTB Labs",
        period: "Sep 2025 – Present",
        periodEs: "Sept 2025 – Presente",
        description: [
            "Lead end-to-end product design processes, from user research, discovery, and wireframing to interaction design and high-fidelity prototypes.",
            "Design, build, and scale corporate Design Systems, reusable component libraries, and visual tokens for consistent brand identity.",
            "Develop responsive, high-performance web applications and e-commerce interfaces using React, Next.js, TypeScript, and modern frontend architectures.",
            "Transform complex user flows into intuitive, accessible, and conversion-optimized interfaces using modern design-to-code workflows.",
            "Partner with cross-functional teams to align UX strategy, business goals, and technical feasibility, accelerating delivery through AI-assisted workflows."
        ],
        descriptionEs: [
            "Liderazgo en procesos de diseño de producto end-to-end, desde investigación con usuarios, descubrimiento y wireframing hasta diseño de interacción y prototipos de alta fidelidad.",
            "Diseño, construcción y escalado de Sistemas de Diseño corporativos, librerías de componentes reutilizables y tokens visuales para garantizar consistencia de marca.",
            "Desarrollo de aplicaciones web responsivas y de alto rendimiento e interfaces e-commerce utilizando React, Next.js, TypeScript y arquitecturas frontend modernas.",
            "Transformación de flujos complejos de usuario en interfaces intuitivas, accesibles y optimizadas para conversión mediante flujos design-to-code.",
            "Colaboración estratégica con equipos multidisciplinarios para alinear estrategia UX, metas de negocio y viabilidad técnica, acelerando entregas con herramientas asistidas por IA."
        ],
        tags: ["Figma", "Design Systems", "UX Research", "Prototyping", "React", "Next.js", "TypeScript", "Tailwind CSS", "Storybook", "Git", "CI/CD", "AI Tools (Claude, Antigravity)"]
    },
    {
        id: "tiendapp",
        role: "Lead Design Engineer (UI/UX Lead & Frontend Developer)",
        roleEs: "Líder de Diseño e Ingeniería UI/UX (Frontend & UI/UX Lead)",
        company: "TIENDAPP SAS",
        period: "Oct 2022 – Sep 2025",
        periodEs: "Oct 2022 – Sept 2025",
        description: [
            "Directed the UI/UX team and product design strategy, conducting user research, usability testing, and A/B experimentation to validate decisions.",
            "Designed, prototyped, and optimized end-to-end user journeys and interface architectures across web and mobile platforms.",
            "Built, maintained, and scaled corporate Design Systems and component libraries, bridging the gap between design and engineering.",
            "Engineered high-performance mobile apps (React Native) and web platforms (Next.js/TypeScript), optimizing load times, code maintainability, and responsiveness.",
            "Facilitated alignment between enterprise business goals and technical objectives, technically guiding product lifecycle execution."
        ],
        descriptionEs: [
            "Dirección del equipo de UI/UX y la estrategia de diseño de producto, realizando investigación de usuarios, pruebas de usabilidad y experimentación A/B.",
            "Diseño, prototipado y optimización de recorridos de usuario (user journeys) e interfaces de extremo a extremo en plataformas web y móviles.",
            "Construcción, mantenimiento y escalado de Sistemas de Diseño corporativos y librerías de componentes, uniendo diseño e ingeniería.",
            "Desarrollo e ingeniería de aplicaciones móviles (React Native) y plataformas web (Next.js/TypeScript), optimizando tiempos de carga, mantenibilidad del código y adaptabilidad.",
            "Alineación entre metas de negocio y objetivos técnicos de ingeniería, liderando la ejecución técnica del ciclo de vida del producto."
        ],
        tags: ["Figma", "Adobe XD", "Design Systems", "User Flows", "UX Strategy", "A/B Testing", "React", "React Native", "TypeScript", "Next.js", "SCSS", "Storybook", "CRM/ERP", "Analytics", "Git"]
    },
    {
        id: "alpina",
        role: "Senior Frontend Engineer & UI Designer",
        roleEs: "Ingeniera Frontend Senior & Diseñadora UI",
        company: "Alpina / Julius Connected 2 Grow",
        period: "Mar 2020 – Feb 2022",
        periodEs: "Mar 2020 – Feb 2022",
        description: [
            "Designed and wireframed high-conversion digital experiences, landing pages, and interaction flows for product launches and enterprise brands.",
            "Simplified complex user journeys through information architecture, interaction design, and brand-consistent interface guidelines.",
            "Coded, deployed, and maintained web portals and custom web applications using HTML5, CSS3, JavaScript, jQuery, and PHP/CMS architectures.",
            "Optimized website speed, Core Web Vitals, and technical SEO while managing webmaster operations to ensure zero-downtime performance."
        ],
        descriptionEs: [
            "Diseño y creación de wireframes para experiencias digitales de alta conversión, landing pages y flujos de interacción para lanzamientos de marca y portales corporativos.",
            "Simplificación de flujos complejos de usuario a través de mejoras en arquitectura de información, diseño de interacción y guías de marca.",
            "Programación, desarrollo y mantenimiento de portales web y aplicaciones personalizadas con HTML5, CSS3, JavaScript, jQuery y PHP/CMS.",
            "Optimización de velocidad web, Core Web Vitals y SEO técnico, liderando operaciones de Webmaster para garantizar cero interrupciones."
        ],
        tags: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "UI/UX Design", "HTML5", "CSS3", "JavaScript", "PHP", "CMS", "Google Analytics", "SEO", "Email Marketing"]
    },
    {
        id: "sproutloud",
        role: "Frontend Developer & Web Designer",
        roleEs: "Desarrolladora Frontend & Diseñadora Web",
        company: "SproutLoud",
        period: "Apr 2019 – Oct 2019",
        periodEs: "Abr 2019 – Oct 2019",
        description: [
            "Designed user-friendly layout concepts and landing pages aligned with brand identity and marketing guidelines.",
            "Conducted usability evaluation and testing strategies to identify UX friction points and fix interface usability issues.",
            "Developed and migrated responsive websites on CMS architectures using clean HTML5, CSS3, and JavaScript code.",
            "Reduced page load times and raised frontend code quality through image compression, script optimization, and QA testing."
        ],
        descriptionEs: [
            "Diseño de maquetación y landing pages amigables centradas en el usuario, alineadas con la identidad de marca y directrices de marketing.",
            "Evaluación de usabilidad y ejecución de pruebas para identificar puntos de fricción UX y corregir problemas de interfaz.",
            "Desarrollo y migración de sitios web responsivos sobre arquitecturas CMS utilizando código limpio en HTML5, CSS3 y JavaScript.",
            "Reducción de tiempos de carga y optimización de rendimiento frontend mediante compresión de recursos, refactorización de scripts y pruebas QA."
        ],
        tags: ["Web Design", "HTML5", "CSS3", "JavaScript", "CMS Platforms", "Responsive Design", "QA Testing", "Performance Optimization"]
    },
    {
        id: "samsung",
        role: "Content Manager Specialist & Frontend Lead",
        roleEs: "Especialista de Contenido Web & Líder Frontend",
        company: "Samsung",
        period: "Sep 2018 – Apr 2019",
        periodEs: "Sept 2018 – Abr 2019",
        description: [
            "Designed and optimized product pages (PDP) and user journeys, improving visual hierarchy, content structure, and UI/UX conversion rates.",
            "Created interactive digital content and web assets aligned with global product launch strategies and brand governance.",
            "Implemented frontend enhancements across e-commerce retail platforms (Adobe Experience Manager/CMS) using HTML5 and CSS3.",
            "Monitored web analytics and user metrics to drive continuous performance optimization and bridge design with development."
        ],
        descriptionEs: [
            "Diseño y optimización de páginas de producto (PDP) y flujos de navegación, mejorando la jerarquía visual, estructura de contenido y conversión UI/UX.",
            "Creación de contenido digital interactivo y piezas web alineadas con estrategias globales de lanzamiento y gobernanza de marca.",
            "Implementación y desarrollo frontend en plataformas e-commerce (Adobe Experience Manager/CMS) mediante HTML5 y CSS3.",
            "Monitoreo de analítica web y métricas de comportamiento de usuario para impulsar optimizaciones continuas y conectar el diseño con el desarrollo."
        ],
        tags: ["UX Optimization", "Content Strategy", "Adobe Experience Manager", "CMS", "E-commerce", "HTML5", "CSS3", "Analytics"]
    },
    {
        id: "ita-latam",
        role: "Lead Interactive Designer & Frontend Engineer",
        roleEs: "Líder de Diseño Interactivo e Ingeniería Frontend",
        company: "ITA LATAM / El Colombiano",
        period: "Feb 2015 – Sep 2018",
        periodEs: "Feb 2015 – Sept 2018",
        description: [
            "Designed user journeys, wireframes, prototypes, and interactive UI interfaces for e-commerce platforms and media portals.",
            "Created Design Systems, visual guidelines, and branding assets to ensure cross-platform experience consistency.",
            "Programmed custom WordPress and Shopify themes, developing frontend layouts with HTML5, CSS3, JavaScript, jQuery, Bootstrap, and PHP.",
            "Managed webmaster operations, technical SEO implementation, analytics tracking, and speed optimization for enterprise clients."
        ],
        descriptionEs: [
            "Diseño de flujos de usuario, wireframes, prototipos e interfaces UI interactivas para plataformas de comercio electrónico y portales de medios.",
            "Creación de Sistemas de Diseño, guías de estilo visual y recursos de marca para garantizar consistencia multicanal.",
            "Programación y desarrollo de temas personalizados en WordPress y Shopify utilizando HTML5, CSS3, JavaScript, jQuery, Bootstrap y PHP.",
            "Gestión de operaciones de Webmaster, SEO técnico, métricas de analítica y optimización de velocidad para clientes corporativos."
        ],
        tags: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "UX/UI Design", "WordPress", "Shopify", "PHP", "JavaScript", "HTML5/CSS3", "Bootstrap", "SEO", "Analytics"]
    },
    {
        id: "miguelo-linkapedia",
        role: "UI Designer & Frontend Developer",
        roleEs: "Diseñadora UI & Desarrolladora Frontend",
        company: "Miguelo Romano & Linkapedia",
        period: "Sep 2013 – Sep 2014",
        periodEs: "Sept 2013 – Sept 2014",
        description: [
            "Participated in the UX/UI Design area, creating user-centric wireframes, visual branding, and interactive interfaces.",
            "Built reusable UI components and responsive layouts that ensured visual consistency across e-commerce sites.",
            "Programmed responsive web pages and digital assets using HTML5, CSS3, JavaScript, jQuery, and CMS platforms."
        ],
        descriptionEs: [
            "Participación en el área de Diseño UX/UI, creando wireframes centrados en el usuario, branding visual e interfaces interactivas.",
            "Construcción de componentes reutilizables de UI y maquetación responsiva garantizando la consistencia visual en sitios e-commerce.",
            "Programación de páginas web responsivas y recursos digitales utilizando HTML5, CSS3, JavaScript, jQuery y plataformas CMS."
        ],
        tags: ["UI Design", "Branding", "Photoshop", "Illustrator", "HTML5", "CSS3", "JavaScript", "jQuery", "CMS", "Responsive Design"]
    },
    {
        id: "gea-cordesarrollo",
        role: "Graphic & Digital Designer",
        roleEs: "Diseñadora Gráfica y Digital",
        company: "GEA Colombia & Cordesarrollo",
        period: "2013 – 2014",
        periodEs: "2013 – 2014",
        description: [
            "Designed editorial materials, branding identity, and educational books with strong visual hierarchy and layout precision.",
            "Produced web-ready visual assets, digital graphics, and UI graphics supporting early digital web initiatives."
        ],
        descriptionEs: [
            "Diseño de materiales editoriales, identidad de marca y libros educativos con sólida jerarquía visual y precisión de maquetación.",
            "Creación de recursos gráficos optimizados para la web y piezas de UI apoyando las primeras iniciativas digitales."
        ],
        tags: ["Adobe Creative Suite", "Photoshop", "Illustrator", "InDesign", "Premiere Pro", "Visual Design", "Branding", "Layout", "Digital Assets"]
    },
    {
        id: "yuxi-global",
        role: "EPUB Developer & Multimedia Designer",
        roleEs: "Desarrolladora EPUB & Diseñadora Multimedia",
        company: "Yuxi Global",
        period: "Dec 2012 – Apr 2013",
        periodEs: "Dic 2012 – Abr 2013",
        description: [
            "Designed layout structures and digital publishing interfaces for interactive e-books and EPUB publications.",
            "Programmed EPUB interactive digital publications optimized for responsive reading across mobile devices using HTML/CSS/JS.",
            "Executed cross-browser testing, QA verification, and code optimization for seamless digital distribution."
        ],
        descriptionEs: [
            "Diseño de maquetación y estructuras de interfaz para publicaciones digitales e-books y formato EPUB.",
            "Programación de publicaciones digitales interactivas EPUB optimizadas para lectura responsiva en dispositivos móviles con HTML/CSS/JS.",
            "Ejecución de pruebas de compatibilidad multiplataforma, control de calidad (QA) y optimización de código para distribución digital."
        ],
        tags: ["EPUB Programming", "Interactive Digital Media", "HTML", "CSS", "JavaScript", "Cross-browser Testing", "QA"]
    }
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

export default function Experience({ onBack, language = 'en' }: { onBack: () => void, language: 'en' | 'es' }) {
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
    }, []);

    const t = {
        title: language === 'en' ? 'Experience' : 'Experiencia',
        back: language === 'en' ? 'Back' : 'Volver',
        education: language === 'en' ? 'Education' : 'Educación',
        edu1_deg: language === 'en' ? 'Digital Marketing' : 'Marketing Digital',
        edu1_inst: language === 'en' ? 'EAFIT University / Diploma' : 'Universidad EAFIT / Diplomado',
        edu2_deg: language === 'en' ? 'Advertising' : 'Publicidad',
        edu2_inst: language === 'en' ? 'Universidad Católica Luis Amigó / Bachelor' : 'Universidad Católica Luis Amigó / Profesional',
        edu3_deg: language === 'en' ? 'Multimedia Production' : 'Producción Multimedia',
        edu3_inst: language === 'en' ? 'SENA / Bachelor' : 'SENA / Tecnólogo',
    };

    return (
        <div className="w-full max-w-4xl mx-auto h-full flex flex-col">
            <div className="flex-none flex items-center justify-between mb-8 relative z-10">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t.title}</h2>
                </div>
                <button
                    onClick={onBack}
                    className="bg-white/10 hover:bg-white/20 text-slate-900 transition-all rounded-full p-2 flex items-center gap-2 px-4 shadow-sm border border-white/20 backdrop-blur-md cursor-pointer"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    <span className="text-sm font-medium">{t.back}</span>
                </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto pr-4 pb-4 custom-scrollbar space-y-12">
                <section>
                    <div className="space-y-8">
                        {experiences.map((exp, index) => {
                            const role = language === 'en' ? exp.role : (exp.roleEs || exp.role);
                            const period = language === 'en' ? exp.period : (exp.periodEs || exp.period);
                            const description = language === 'en' ? exp.description : (exp.descriptionEs || exp.description);

                            return (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="relative pl-4 md:pl-8 border-l border-slate-300/50"
                                >
                                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-petite-orchid shadow-[0_0_10px_rgba(219,165,221,0.6)]" />
                                    <div className="mb-1 text-sm font-bold tracking-wider text-petite-orchid uppercase">
                                        {period}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1">
                                        {role}
                                    </h3>
                                    <div className="text-lg text-slate-700 font-medium mb-4">{exp.company}</div>
                                    
                                    <ul className="space-y-2 mb-4">
                                        {description.map((item, i) => (
                                            <li key={i} className="text-slate-600 leading-relaxed text-sm flex gap-2">
                                                <span className="text-slate-400 mt-1.5 min-w-[4px] h-[4px] bg-slate-400 rounded-full block"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Tech & Tools Tags (Glass Pills) */}
                                    {exp.tags && exp.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {exp.tags.map((tag, tIdx) => (
                                                <span 
                                                    key={tIdx} 
                                                    className="glass-panel px-3 py-1 rounded-full text-xs font-medium border border-white/40 text-slate-700 shadow-sm hover:bg-white/30 transition-colors"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                <section>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight sticky top-[-10px] py-2">{t.education}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {education.map((edu) => {
                            let degree = edu.degree;
                            let inst = edu.institution;
                            if (edu.id === 'edu1') { degree = t.edu1_deg; inst = t.edu1_inst; }
                            if (edu.id === 'edu2') { degree = t.edu2_deg; inst = t.edu2_inst; }
                            if (edu.id === 'edu3') { degree = t.edu3_deg; inst = t.edu3_inst; }

                            return (
                                <div key={edu.id} className="p-4 rounded-glass-sm glass-panel bg-white/5 border border-white/20 shadow-sm relative overflow-hidden group hover:bg-white/10 transition-colors">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-4xl text-slate-900">school</span>
                                    </div>
                                    <div className="text-xs font-bold text-slate-500 mb-1">{edu.year}</div>
                                    <h4 className="font-bold text-slate-900">{degree}</h4>
                                    <div className="text-sm text-slate-600">{inst}</div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}

