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
        id: "devbloom",
        role: "Senior Design Engineer (Frontend Engineer | UI/UX Designer)",
        roleEs: "Ingeniera Senior de Diseño (Frontend Engineer & Diseñadora UI/UX)",
        company: "Devbloom",
        period: "Sep 2025 – Present",
        periodEs: "Sept 2025 – Presente",
        description: [
            "Lead the end-to-end design and development of scalable digital products, translating business requirements into intuitive, production-ready experiences.",
            "Design and implement Design Systems, reusable component libraries, and modern frontend architectures that improve consistency, maintainability, and collaboration.",
            "Transform complex user flows into accessible, responsive interfaces using modern frontend technologies and design-to-code workflows.",
            "Partner with product managers, designers, and engineers to align user needs, business goals, and technical feasibility throughout the product lifecycle.",
            "Accelerate product delivery through AI-assisted workflows, performance optimization, and continuous frontend improvements.",
            "Tech: React, Next.js, TypeScript, PHP, Tailwind CSS, Figma, Storybook, Git, CI/CD, Claude, Antigravity"
        ],
        descriptionEs: [
            "Liderazgo en el diseño y desarrollo end-to-end de productos digitales escalables, traduciendo requerimientos de negocio en experiencias intuitivas listas para producción.",
            "Diseño e implementación de Sistemas de Diseño, librerías de componentes reutilizables y arquitecturas frontend modernas que mejoran la consistencia, mantenibilidad y colaboración.",
            "Transformación de flujos complejos de usuario en interfaces accesibles y responsivas utilizando tecnologías frontend modernas y flujos design-to-code.",
            "Colaboración estratégica con product managers, diseñadores e ingenieros para alinear necesidades del usuario, objetivos de negocio y viabilidad técnica.",
            "Aceleración de la entrega de producto a través de flujos asistidos por IA, optimización de rendimiento e iteración continua del frontend.",
            "Tecnologías: React, Next.js, TypeScript, PHP, Tailwind CSS, Figma, Storybook, Git, CI/CD, Claude, Antigravity"
        ]
    },
    {
        id: "tiendapp",
        role: "Lead Design UI-UX and Frontend Developer",
        roleEs: "Líder de Diseño UI/UX y Desarrollo Frontend",
        company: "Tiendapp SAS",
        period: "Oct 2022 – Sep 2025",
        periodEs: "Oct 2022 – Sept 2025",
        description: [
            "Led the design and development of web and mobile products, translating business requirements into intuitive user experiences and scalable frontend solutions.",
            "Designed, implemented, and evolved Design Systems, improving consistency, reusability, and collaboration between design and engineering teams.",
            "Built responsive interfaces that ensured accessibility, performance, and pixel-perfect implementation across platforms.",
            "Mentored designers and frontend developers, establishing best practices for UX, component architecture, and implementation quality.",
            "Collaborated with stakeholders to validate product decisions, prioritize initiatives, and continuously improve user experience across multiple digital platforms.",
            "Tech: React, React Native, TypeScript, JavaScript, HTML5, CSS3, SCSS, Figma, Storybook, Design Systems, CRM, ERP, Analytics, Git"
        ],
        descriptionEs: [
            "Lideró el diseño y desarrollo de productos web y móviles, traduciendo necesidades de negocio en experiencias de usuario intuitivas y soluciones frontend escalables.",
            "Diseño, implementación y evolución de Sistemas de Diseño corporativos, mejorando la consistencia, reutilización y sinergia entre equipos de diseño e ingeniería.",
            "Desarrollo de interfaces responsivas garantizando accesibilidad, alto rendimiento e implementación pixel-perfect entre plataformas.",
            "Mentoría a diseñadores y desarrolladores frontend, estableciendo mejores prácticas de UX, arquitectura de componentes y calidad de software.",
            "Colaboración con directivos y partes interesadas para validar decisiones de producto, priorizar iniciativas y mejorar continuamente la experiencia de usuario.",
            "Tecnologías: React, React Native, TypeScript, JavaScript, HTML5, CSS3, SCSS, Figma, Storybook, Sistemas de Diseño, CRM, ERP, Analytics, Git"
        ]
    },
    {
        id: "alpina",
        role: "Lead Frontend Engineer & UI Designer",
        roleEs: "Líder de Ingeniería Frontend & Diseñadora UI",
        company: "Alpina / Julius Connected 2 Grow",
        period: "Mar 2020 – Feb 2022",
        periodEs: "Mar 2020 – Feb 2022",
        description: [
            "Designed and developed digital experiences for enterprise brands, transforming marketing and business objectives into scalable, user-centered interfaces.",
            "Created wireframes, user flows, and responsive frontend solutions that balanced usability, brand consistency, and technical performance.",
            "Collaborated with multidisciplinary teams to deliver landing pages, websites, and e-mail campaign experiences optimized for accessibility, performance, and conversion.",
            "Integrated analytics and user insights to support continuous optimization and data-informed design decisions.",
            "Tech: HTML5, CSS3, JavaScript, PHP, CMS, Adobe XD, Google Analytics, SEO, Email Marketing"
        ],
        descriptionEs: [
            "Diseño y desarrollo de experiencias digitales para marcas empresariales, transformando objetivos de marketing y negocio en interfaces escalables y centradas en el usuario.",
            "Creación de wireframes, flujos de usuario y soluciones frontend responsivas con equilibrio entre usabilidad, consistencia de marca y rendimiento técnico.",
            "Liderazgo Webmaster y desarrollo de landing pages, portales web y campañas de email marketing optimizadas para accesibilidad, rendimiento y conversión.",
            "Integración de analítica web e insights de usuario para respaldar la optimización continua y decisiones de diseño basadas en datos.",
            "Tecnologías: HTML5, CSS3, JavaScript, PHP, CMS, Adobe XD, Google Analytics, SEO, Email Marketing"
        ]
    },
    {
        id: "sproutloud",
        role: "Frontend Developer",
        roleEs: "Desarrolladora Frontend",
        company: "SproutLoud",
        period: "Apr 2019 – Oct 2019",
        periodEs: "Abr 2019 – Oct 2019",
        description: [
            "Developed responsive websites and landing pages, translating marketing requirements into user-friendly digital experiences.",
            "Collaborated with designers and cross-functional teams to deliver accessible, responsive interfaces aligned with brand guidelines.",
            "Improved website performance through frontend optimization, quality assurance, and structured testing processes.",
            "Maintained and enhanced CMS-based platforms while supporting continuous feature delivery in Agile environments.",
            "Tech: HTML5, CSS3, JavaScript, CMS, Responsive Design, QA, Performance Optimization"
        ],
        descriptionEs: [
            "Desarrollo de sitios web responsivos y landing pages, traduciendo requerimientos de marketing en experiencias digitales intuitivas.",
            "Colaboración con diseñadores y equipos multidisciplinarios para entregar interfaces accesibles alineadas con guías de marca.",
            "Optimización de velocidad y rendimiento web a través de compresión de recursos, aseguramiento de calidad y pruebas estructuradas.",
            "Mantenimiento y evolución de plataformas basadas en CMS garantizando entregas continuas en entornos Ágiles.",
            "Tecnologías: HTML5, CSS3, JavaScript, CMS, Diseño Responsivo, QA, Optimización de Rendimiento"
        ]
    },
    {
        id: "samsung",
        role: "Web Content Specialist & Frontend Lead",
        roleEs: "Especialista de Contenido Web & Líder Frontend",
        company: "Samsung",
        period: "Apr 2018 – Apr 2019",
        periodEs: "Abr 2018 – Abr 2019",
        description: [
            "Optimized digital commerce experiences by combining content strategy, UX improvements, and frontend implementation across multiple retail channels.",
            "Enhanced product pages and customer journeys, ensuring consistency, usability, and alignment with product launch strategies.",
            "Coordinated design, marketing, and technical teams to deliver high-quality digital experiences while maintaining content governance.",
            "Leveraged analytics and performance insights to continuously improve customer experience and digital engagement.",
            "Tech: HTML5, CSS3, CMS, E-commerce, Adobe Experience Manager, Analytics, Content Strategy"
        ],
        descriptionEs: [
            "Optimización de experiencias de comercio digital combinando estrategia de contenido, mejoras de UX e implementación frontend en canales retail.",
            "Mejora de páginas de producto (PDP) y recorridos de cliente, garantizando consistencia, usabilidad y alineación con lanzamientos de marca.",
            "Coordinación entre equipos de diseño, marketing e ingeniería para entregar experiencias digitales de alta calidad con gobernanza de contenido.",
            "Uso de métricas y analítica web para optimizar continuamente la conversión y el engagement digital de los usuarios.",
            "Tecnologías: HTML5, CSS3, CMS, E-commerce, Adobe Experience Manager, Analytics, Estrategia de Contenido"
        ]
    },
    {
        id: "ita-colombiano",
        role: "Lead Frontend Engineer & UI Designer",
        roleEs: "Líder de Ingeniería Frontend, Diseñadora UI & Webmaster",
        company: "ITA LATAM / El Colombiano / Grupo Éxito",
        period: "Feb 2015 – Sep 2018",
        periodEs: "Feb 2015 – Sept 2018",
        description: [
            "Led the design and development of websites, e-commerce platforms, and digital experiences for clients across multiple industries.",
            "Designed user journeys, wireframes, and interfaces before translating them into responsive, production-ready frontend solutions.",
            "Implemented Design Systems, performance optimization, and scalable frontend practices to improve usability and long-term maintainability.",
            "Worked directly with clients and multidisciplinary teams to transform business needs into functional digital products.",
            "Tech: WordPress, Shopify, PHP, JavaScript, HTML5, CSS3, jQuery, Bootstrap, Figma, Adobe XD, Photoshop, SEO, Google Analytics"
        ],
        descriptionEs: [
            "Lideró el diseño y desarrollo de sitios web, plataformas de comercio electrónico y experiencias digitales para clientes de diversas industrias.",
            "Diseño de flujos de usuario, wireframes e interfaces antes de traducirlas en soluciones frontend responsivas listas para producción.",
            "Implementación de Sistemas de Diseño, optimización de velocidad y buenas prácticas frontend para mejorar usabilidad y mantenibilidad.",
            "Trabajo directo con clientes y equipos multidisciplinarios para transformar necesidades comerciales en productos digitales funcionales.",
            "Tecnologías: WordPress, Shopify, PHP, JavaScript, HTML5, CSS3, jQuery, Bootstrap, Figma, Adobe XD, Photoshop, SEO, Google Analytics"
        ]
    },
    {
        id: "miguelo-linkapedia",
        role: "Frontend Developer & Graphic Designer",
        roleEs: "Desarrolladora Frontend y Diseñadora Gráfica",
        company: "Miguelo Romano & Linkapedia",
        period: "Sep 2013 – Sep 2014",
        periodEs: "Sept 2013 – Sept 2014",
        description: [
            "Designed and developed responsive interfaces for e-commerce platforms, websites, and digital marketing initiatives.",
            "Built reusable UI components that improved visual consistency and streamlined frontend implementation.",
            "Collaborated with design and development teams to deliver integrated branding, user experience, and frontend solutions.",
            "Tech: HTML5, CSS3, JavaScript, jQuery, CMS, UI Design, Responsive Design, Photoshop, Illustrator"
        ],
        descriptionEs: [
            "Diseño y desarrollo de interfaces responsivas para plataformas e-commerce, sitios web e iniciativas de marketing digital.",
            "Construcción de componentes reutilizables de UI que mejoraron la consistencia visual y agilizaron la implementación frontend.",
            "Colaboración e integración de branding, experiencia de usuario y desarrollo frontend.",
            "Tecnologías: HTML5, CSS3, JavaScript, jQuery, CMS, Diseño UI, Diseño Responsivo, Photoshop, Illustrator"
        ]
    },
    {
        id: "gea-cordesarrollo",
        role: "Graphic & Digital Designer",
        roleEs: "Diseñadora Gráfica y Digital",
        company: "GEA Colombia & Cordesarrollo",
        period: "Apr 2013 – Sep 2014",
        periodEs: "Abr 2013 – Sept 2014",
        description: [
            "Designed editorial, branding, and digital assets that strengthened visual communication across print and digital channels.",
            "Created web-ready visual resources while supporting the development of early digital experiences.",
            "Tech: Photoshop, Illustrator, InDesign, Premiere Pro, Branding, Editorial Design, Digital Design"
        ],
        descriptionEs: [
            "Diseño de recursos editoriales, de marca y digitales que fortalecieron la comunicación visual en canales impresos y digitales.",
            "Creación de recursos visuales listos para la web apoyando el desarrollo de primeras experiencias digitales.",
            "Tecnologías: Photoshop, Illustrator, InDesign, Premiere Pro, Branding, Diseño Editorial, Diseño Digital"
        ]
    },
    {
        id: "yuxi",
        role: "EPUB Developer",
        roleEs: "Desarrolladora EPUB & Multimedia",
        company: "Yuxi Global",
        period: "Dec 2012 – Apr 2013",
        periodEs: "Dic 2012 – Abr 2013",
        description: [
            "Developed interactive digital publications optimized for responsive viewing across multiple devices.",
            "Collaborated on frontend implementation, testing, and quality assurance to ensure consistent user experiences.",
            "Tech: HTML, CSS, JavaScript, EPUB, Responsive Design, Cross-browser Testing, QA"
        ],
        descriptionEs: [
            "Desarrollo de publicaciones digitales interactivas optimizadas para visualización responsiva en múltiples dispositivos.",
            "Colaboración en la implementación frontend, pruebas de calidad y compatibilidad multiplataforma.",
            "Tecnologías: HTML, CSS, JavaScript, EPUB, Diseño Responsivo, Pruebas Multi-navegador, QA"
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

    const cvFile = language === 'en' 
        ? '/CV/Maria-Tavera-Resume-DesignEngineer.pdf' 
        : '/CV/Maria-Alejandra-Tavera-CV.pdf';

    const t = {
        title: language === 'en' ? 'Experience' : 'Experiencia',
        back: language === 'en' ? 'Back' : 'Volver',
        downloadCv: language === 'en' ? 'Download CV (PDF)' : 'Descargar CV (PDF)',
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
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t.title}</h2>
                    <a
                        href={cvFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-petite-orchid/40 text-slate-900 text-xs font-bold uppercase tracking-wider hover:bg-white/40 transition-all shadow-sm hover:scale-105"
                    >
                        <span className="material-symbols-outlined text-base text-petite-orchid">download</span>
                        {t.downloadCv}
                    </a>
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

