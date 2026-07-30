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
            "Lead end-to-end product design and frontend engineering processes, from discovery, research, and wireframing to interaction design and production-ready implementation.",
            "Design and implement scalable Design Systems, reusable component libraries, and modern frontend architectures that enhance visual consistency and code maintainability.",
            "Redesign complex workflows into intuitive, user-centered interfaces using modern design-to-code workflows and responsive design standards.",
            "Partner closely with product managers, designers, and engineers to align user needs, business objectives, and technical feasibility throughout the product lifecycle.",
            "Accelerate product delivery and UX performance through AI-assisted workflows, design tokens, and continuous frontend optimization."
        ],
        descriptionEs: [
            "Liderazgo en procesos de diseño de producto e ingeniería frontend end-to-end, desde investigación, descubrimiento y wireframing hasta diseño de interacción e implementación en producción.",
            "Diseño e implementación de Sistemas de Diseño escalables, librerías de componentes reutilizables y arquitecturas frontend modernas que mejoran la consistencia visual y mantenibilidad del código.",
            "Rediseño de flujos de trabajo complejos en interfaces intuitivas centradas en el usuario utilizando flujos design-to-code y estándares de diseño responsivo.",
            "Colaboración estratégica con product managers, diseñadores e ingenieros para alinear necesidades del usuario, objetivos de negocio y viabilidad técnica.",
            "Aceleración en la entrega de productos y rendimiento UX mediante flujos asistidos por IA, design tokens y optimización continua de frontend."
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
            "Led the UI/UX design and frontend development team, defining product design strategy and aligning user experience with enterprise business goals.",
            "Designed, prototyped, and optimized end-to-end user journeys and responsive interfaces across web and mobile platforms (React Native & Next.js).",
            "Built, maintained, and scaled corporate Design Systems to ensure brand consistency and streamline cross-functional design-to-development workflows.",
            "Conducted user research, usability testing, and data-driven experimentation (A/B testing) to validate product decisions and improve conversion metrics.",
            "Mentored designers and frontend developers, establishing best practices for UX architecture, component design, and implementation quality."
        ],
        descriptionEs: [
            "Liderazgo del equipo de diseño UI/UX y desarrollo frontend, definiendo la estrategia de diseño de producto y alineando la experiencia de usuario con metas empresariales.",
            "Diseño, prototipado y optimización de recorridos de usuario (user journeys) de extremo a extremo e interfaces responsivas en plataformas web y móviles (React Native & Next.js).",
            "Construcción, mantenimiento y escalado de Sistemas de Diseño corporativos para garantizar consistencia de marca y agilizar flujos design-to-development.",
            "Investigación de usuarios, pruebas de usabilidad y experimentación basada en datos (pruebas A/B) para validar decisiones e incrementar métricas de conversión.",
            "Mentoría a diseñadores y desarrolladores frontend, estableciendo mejores prácticas de arquitectura UX, diseño de componentes y calidad de código."
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
            "Designed and delivered high-conversion digital experiences and enterprise web platforms, aligning user needs with brand and business objectives.",
            "Simplified complex user journeys through improved information architecture, interaction design, wireframes, and high-fidelity prototypes.",
            "Translated business requirements into scalable, responsive frontend solutions, maintaining pixel-perfect fidelity and cross-browser performance.",
            "Collaborated with multidisciplinary teams to build landing pages, corporate portals, and email campaigns optimized for accessibility, SEO, and performance."
        ],
        descriptionEs: [
            "Diseño y entrega de experiencias digitales de alta conversión y plataformas web empresariales, alineando necesidades del usuario con objetivos de marca y negocio.",
            "Simplificación de flujos complejos de usuario mediante mejoras en arquitectura de información, diseño de interacción, wireframes y prototipos de alta fidelidad.",
            "Traducción de requerimientos comerciales en soluciones frontend responsivas y escalables, garantizando fidelidad pixel-perfect y rendimiento técnico.",
            "Colaboración con equipos multidisciplinarios en el desarrollo de landing pages, portales corporativos y campañas optimizadas para accesibilidad, SEO y conversión."
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
            "Developed responsive websites and high-converting landing pages combining visual design principles with CMS-based architectures.",
            "Improved site performance and technical quality through asset optimization, responsive code refactoring, and structured QA testing.",
            "Collaborated with designers and cross-functional teams to deliver accessible, user-friendly digital features in Agile sprint environments."
        ],
        descriptionEs: [
            "Desarrollo de sitios web responsivos y landing pages de alta conversión combinando principios de diseño visual con arquitecturas CMS.",
            "Optimización de rendimiento web y calidad técnica a través de compresión de recursos, refactorización de código responsivo y pruebas de QA.",
            "Colaboración con diseñadores y equipos multidisciplinarios para entregar funcionalidades digitales accesibles en entornos ágiles."
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
            "Optimized e-commerce experiences across retail platforms, improving content structure, visual hierarchy, and user journey flow.",
            "Designed and implemented product page (PDP) enhancements aligned with conversion strategies and global launch guidelines.",
            "Served as a bridge between design, marketing, and development teams to ensure consistent, high-quality user experiences and content governance."
        ],
        descriptionEs: [
            "Optimización de experiencias de comercio electrónico en plataformas retail, mejorando la estructura de contenido, jerarquía visual y flujos de usuario.",
            "Diseño e implementación de mejoras en páginas de producto (PDP) alineadas con estrategias de conversión y guías globales de marca.",
            "Conexión efectiva entre equipos de diseño, marketing e ingeniería para garantizar experiencias de usuario de alta calidad y gobernanza de contenido."
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
            "Led the design and development of responsive websites, e-commerce stores, and interactive digital products for clients across multiple industries.",
            "Created wireframes, user flows, and custom UI components before translating them into production-ready frontend code.",
            "Implemented Design Systems, SEO strategies, analytics tracking, and performance optimization practices for long-term scalability."
        ],
        descriptionEs: [
            "Liderazgo en el diseño y desarrollo de sitios web responsivos, tiendas e-commerce y productos digitales interactivos para diversas industrias.",
            "Creación de wireframes, flujos de usuario y componentes personalizados de UI antes de traducirlos en código frontend listo para producción.",
            "Implementación de Sistemas de Diseño, estrategias SEO, métricas de analítica y optimización de rendimiento para sostenibilidad a largo plazo."
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
            "Designed and developed user interfaces for e-commerce sites, corporate platforms, and digital marketing campaigns.",
            "Built reusable UI components and responsive landing pages ensuring visual consistency and intuitive user interaction.",
            "Supported branding initiatives from initial visual concept to functional frontend deployment."
        ],
        descriptionEs: [
            "Diseño y desarrollo de interfaces de usuario para sitios e-commerce, plataformas corporativas y campañas de marketing digital.",
            "Construcción de componentes reutilizables de UI y landing pages responsivas garantizando consistencia visual e interacción intuitiva.",
            "Soporte a iniciativas de marca desde el concepto visual inicial hasta el despliegue frontend funcional."
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
            "Designed editorial, branding, and digital assets with strong visual hierarchy and clear communication standards.",
            "Created web-ready graphics and visual resources supporting early digital user experiences."
        ],
        descriptionEs: [
            "Diseño de piezas editoriales, de marca y digitales con jerarquía visual sólida y altos estándares de comunicación.",
            "Creación de recursos gráficos optimizados para la web apoyando las primeras experiencias digitales de usuario."
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
            "Developed interactive digital publications and e-books (EPUB) optimized for responsive viewing across mobile devices.",
            "Collaborated on frontend implementation, testing, and cross-platform compatibility for publishing projects."
        ],
        descriptionEs: [
            "Desarrollo de publicaciones digitales interactivas y libros electrónicos (EPUB) optimizados para visualización responsiva en dispositivos móviles.",
            "Colaboración en la implementación frontend, pruebas de calidad y compatibilidad multiplataforma para proyectos editoriales digitales."
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
        title: language === 'en' ? 'Experience' : 'Experiencia',
        back: language === 'en' ? 'Back' : 'Volver',
        techStack: language === 'en' ? 'Tools & Tech Stack' : 'Herramientas & Stack Tecnológico',
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
            <div className="flex-none flex flex-wrap items-center justify-between gap-4 mb-8 relative z-10">
                <div className="flex flex-wrap items-center gap-4">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t.title}</h2>
                    <div className="hidden sm:flex items-center gap-3 glass-panel px-4 py-2 rounded-full border border-white/30 text-xs text-slate-700 font-medium">
                        <a href="mailto:mt.developerdesigner@gmail.com" className="hover:text-petite-orchid transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-petite-orchid">mail</span>
                            mt.developerdesigner@gmail.com
                        </a>
                        <span className="text-slate-300">•</span>
                        <a href="tel:+573206230365" className="hover:text-petite-orchid transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-petite-orchid">call</span>
                            +57 320 623 0365
                        </a>
                    </div>
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

                                    {/* Tech & Tools Stack Tags */}
                                    {exp.tags && exp.tags.length > 0 && (
                                        <div className="mt-4 pt-3 border-t border-slate-200/40">
                                            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                                                {t.techStack}
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {exp.tags.map((tag, tIdx) => (
                                                    <span 
                                                        key={tIdx} 
                                                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold glass-panel text-slate-800 border border-white/60 bg-white/40 shadow-2xs hover:border-petite-orchid/60 transition-colors"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
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

