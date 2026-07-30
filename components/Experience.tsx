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
}

export const experiences: ExperienceItem[] = [
    {
        id: "mtb-labs",
        role: "Product Designer (UX/UI & Frontend)",
        roleEs: "Diseñadora de Producto (UX/UI & Frontend)",
        company: "MTB Labs",
        period: "Sep 2025 – Present",
        periodEs: "Sept 2025 – Presente",
        description: [
            "Lead end-to-end product design processes, from discovery and research to interaction design and high-fidelity execution.",
            "Redesign complex workflows into intuitive, user-centered experiences, improving usability and task efficiency.",
            "Create wireframes, user flows, and prototypes to define and validate scalable product solutions.",
            "Collaborate with product owners and engineering teams to align user needs, business goals, and technical feasibility.",
            "Accelerate product delivery through AI-assisted workflows, performance optimization, and continuous frontend improvements.",
            "Tools & Tech: Figma, UX Research, Prototyping, Design Systems, A/B Testing, AI Tools (Claude, Antigravity), HTML, CSS, JS."
        ],
        descriptionEs: [
            "Liderazgo en procesos de diseño de producto end-to-end, desde investigación y descubrimiento hasta diseño de interacción y ejecución de alta fidelidad.",
            "Rediseño de flujos de trabajo complejos en experiencias intuitivas centradas en el usuario, mejorando la usabilidad y eficiencia de tareas.",
            "Creación de wireframes, flujos de usuario y prototipos para definir y validar soluciones de producto escalables.",
            "Colaboración continua con product owners y equipos de ingeniería para alinear necesidades de usuario, objetivos de negocio y viabilidad técnica.",
            "Aceleración en la entrega de productos mediante flujos asistidos por IA, optimización de rendimiento y mejoras continuas en frontend.",
            "Herramientas y tecnologías: Figma, UX Research, Prototipado, Sistemas de Diseño, Pruebas A/B, Herramientas de IA (Claude, Antigravity), HTML, CSS, JS."
        ]
    },
    {
        id: "tiendapp",
        role: "UI/UX Designer and Frontend Developer",
        roleEs: "Diseñadora UI/UX y Desarrolladora Frontend",
        company: "TIENDAPP SAS",
        period: "Oct 2022 – Sep 2025",
        periodEs: "Oct 2022 – Sept 2025",
        description: [
            "Led the UI/UX team, defining product design strategy and aligning user experience with business objectives.",
            "Designed and optimized end-to-end user journeys across web and mobile platforms.",
            "Built and scaled design systems to ensure consistency and improve design-to-development workflows.",
            "Conducted research, usability testing, and experimentation to validate decisions and drive continuous improvement.",
            "Tools & Tech: Figma, Adobe XD, Design Systems, User Flows, UX Strategy, Analytics, A/B Testing, HTML, CSS, JS, React, Next.js."
        ],
        descriptionEs: [
            "Liderazgo del equipo de UI/UX, definiendo la estrategia de diseño de producto y alineando la experiencia de usuario con objetivos de negocio.",
            "Diseño y optimización de recorridos de usuario (user journeys) de extremo a extremo en plataformas web y móviles.",
            "Construcción y escalado de sistemas de diseño para asegurar consistencia y agilizar los flujos design-to-development.",
            "Investigación, pruebas de usabilidad y experimentación continua para validar decisiones e impulsar la mejora constante.",
            "Herramientas y tecnologías: Figma, Adobe XD, Sistemas de Diseño, Flujos de Usuario, Estrategia UX, Analítica, Pruebas A/B, HTML, CSS, JS, React, Next.js."
        ]
    },
    {
        id: "alpina",
        role: "Frontend Developer and UI Designer",
        roleEs: "Desarrolladora Frontend y Diseñadora UI",
        company: "Alpina / Julius Connected 2 Grow",
        period: "Mar 2020 – Feb 2022",
        periodEs: "Mar 2020 – Feb 2022",
        description: [
            "Designed and delivered high-conversion digital experiences for product launches and enterprise platforms, aligning user needs with business and brand objectives.",
            "Simplified complex user journeys through improved information architecture, interaction design, and user flows.",
            "Translated business requirements into scalable, user-centered solutions, ensuring consistency across multiple digital touchpoints.",
            "Collaborated with cross-functional teams to implement solutions and continuously optimize performance based on data and analytics insights.",
            "Tools & Tech: Figma, Adobe XD, Wireframing, Prototyping, HTML, CSS, JavaScript, PHP, CMS, Analytics, SEO."
        ],
        descriptionEs: [
            "Diseño y entrega de experiencias digitales de alta conversión para lanzamientos de producto y plataformas empresariales.",
            "Simplificación de flujos complejos de usuario mediante mejoras en arquitectura de información, diseño de interacción y navegación.",
            "Traducción de requerimientos de negocio en soluciones escalables centradas en el usuario, garantizando consistencia multicanal.",
            "Colaboración con equipos multidisciplinarios para implementar soluciones y optimizar el rendimiento técnico basado en analítica y datos.",
            "Herramientas y tecnologías: Figma, Adobe XD, Wireframing, Prototipado, HTML, CSS, JavaScript, PHP, CMS, Analítica, SEO."
        ]
    },
    {
        id: "sproutloud",
        role: "Web Developer",
        roleEs: "Desarrolladora Web",
        company: "SproutLoud",
        period: "Apr 2019 – Oct 2019",
        periodEs: "Abr 2019 – Oct 2019",
        description: [
            "Developed websites and landing pages using CMS-based architectures.",
            "Improved performance through asset optimization and structured QA processes.",
            "Collaborated with cross-functional teams delivering features in Agile environments.",
            "Tools & Tech: CMS Platforms, HTML, CSS, JavaScript, QA, Performance Optimization."
        ],
        descriptionEs: [
            "Desarrollo de sitios web y landing pages utilizando arquitecturas basadas en CMS.",
            "Optimización de rendimiento a través de compresión de recursos y procesos estructurados de aseguramiento de calidad (QA).",
            "Colaboración con equipos multidisciplinarios para la entrega continua de funcionalidades en entornos Ágiles.",
            "Herramientas y tecnologías: Plataformas CMS, HTML, CSS, JavaScript, QA, Optimización de Rendimiento."
        ]
    },
    {
        id: "samsung",
        role: "Content Manager Specialist",
        roleEs: "Especialista de Contenido Web",
        company: "Samsung",
        period: "Sep 2018 – Apr 2019",
        periodEs: "Sept 2018 – Abr 2019",
        description: [
            "Optimized e-commerce experiences across multiple retail platforms, improving usability and content structure.",
            "Designed and implemented product page improvements aligned with conversion and business goals.",
            "Bridged design and development teams to ensure consistent and high-quality user experiences.",
            "Managed digital content strategies supported by analytics and performance insights.",
            "Tools & Tech: CMS, Analytics, UX Optimization, HTML, CSS, Content Strategy."
        ],
        descriptionEs: [
            "Optimización de experiencias de comercio electrónico en múltiples plataformas retail, mejorando la usabilidad y estructura de contenido.",
            "Diseño e implementación de mejoras en páginas de producto (PDP) alineadas con metas de conversión y negocio.",
            "Conexión efectiva entre equipos de diseño y desarrollo para garantizar experiencias de usuario consistentes y de alta calidad.",
            "Gestión de estrategias de contenido digital respaldadas por analítica y métricas de rendimiento.",
            "Herramientas y tecnologías: CMS, Analítica, Optimización UX, HTML, CSS, Estrategia de Contenido."
        ]
    },
    {
        id: "ita-latam",
        role: "Interactive Designer & Frontend Developer",
        roleEs: "Diseñadora Interactiva & Desarrolladora Frontend",
        company: "ITA LATAM",
        period: "Feb 2015 – Sep 2018",
        periodEs: "Feb 2015 – Sept 2018",
        description: [
            "Designed and developed responsive websites and e-commerce platforms across multiple industries.",
            "Created user flows, wireframes, and interfaces, translating them into functional frontend implementations.",
            "Implemented SEO, analytics tracking, and performance optimization strategies.",
            "Worked closely with clients and teams to align user experience with business and technical requirements.",
            "Tools & Tech: WordPress, Shopify, PHP, JavaScript, HTML, CSS, SEO, Analytics, UX/UI Design."
        ],
        descriptionEs: [
            "Diseño y desarrollo de sitios web responsivos y plataformas e-commerce para clientes de diversas industrias.",
            "Creación de flujos de usuario, wireframes e interfaces, traduciéndolas en implementaciones frontend funcionales.",
            "Implementación de estrategias de SEO, seguimiento de analítica y optimización de rendimiento técnico.",
            "Trabajo colaborativo con clientes y equipos para alinear la experiencia de usuario con requerimientos técnicos y comerciales.",
            "Herramientas y tecnologías: WordPress, Shopify, PHP, JavaScript, HTML, CSS, SEO, Analítica, Diseño UX/UI."
        ]
    },
    {
        id: "miguelo-linkapedia",
        role: "UI Designer & Frontend Developer",
        roleEs: "Diseñadora UI & Desarrolladora Frontend",
        company: "Miguelo Romano & Linkapedia",
        period: "Sep 2013 – Sep 2014",
        periodEs: "Sept 2013 – Sept 2014",
        description: [
            "Designed and developed interfaces for e-commerce and digital platforms.",
            "Built responsive landing pages ensuring usability and visual consistency.",
            "Supported branding and digital campaigns through integrated design and frontend execution.",
            "Tools & Tech: HTML, CSS, JavaScript, UI Design, Branding, CMS."
        ],
        descriptionEs: [
            "Diseño y desarrollo de interfaces para plataformas digitales y de comercio electrónico.",
            "Construcción de landing pages responsivas garantizando usabilidad y consistencia visual.",
            "Soporte a campañas de branding y marketing digital mediante diseño integrado y ejecución frontend.",
            "Herramientas y tecnologías: HTML, CSS, JavaScript, Diseño UI, Branding, CMS."
        ]
    },
    {
        id: "gea-cordesarrollo",
        role: "Graphic & Digital Designer",
        roleEs: "Diseñadora Gráfica y Digital",
        company: "GEA Colombia & Cordesarrollo",
        period: "2013 – 2014",
        periodEs: "2013 – 2014",
        description: [
            "Designed editorial and digital assets with strong visual hierarchy and communication clarity.",
            "Contributed to early digital experiences by creating web-ready visual assets.",
            "Supported multidisciplinary teams across print and digital initiatives.",
            "Tools & Tech: Adobe Suite, Visual Design, Layout, Digital Assets."
        ],
        descriptionEs: [
            "Diseño de piezas editoriales y digitales con jerarquía visual sólida y claridad comunicativa.",
            "Creación de recursos visuales optimizados para la web apoyando primeras experiencias digitales.",
            "Soporte a equipos multidisciplinarios en iniciativas impresas y digitales.",
            "Herramientas y tecnologías: Adobe Suite, Diseño Visual, Maquetación, Recursos Digitales."
        ]
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
        contact: language === 'en' ? 'Contact:' : 'Contacto:',
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
                                    <ul className="space-y-2">
                                        {description.map((item, i) => (
                                            <li key={i} className="text-slate-600 leading-relaxed text-sm flex gap-2">
                                                <span className="text-slate-400 mt-1.5 min-w-[4px] h-[4px] bg-slate-400 rounded-full block"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
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
