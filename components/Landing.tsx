import { motion, Variants, useMotionValue, animate } from "framer-motion";
import clsx from "clsx";
import { getProjects } from "@/data/projectsData";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface LandingProps {
    onEnter: () => void;
    language: 'en' | 'es';
}

export default function Landing({ onEnter, language }: LandingProps) {
    const t = {
        agencyTitle: "MARÍA TAVERA",
        heroSubtitle: language === 'en' 
            ? "Senior Web Designer & Front-End Developer Lead" 
            : "Diseñadora & Programadora Web Senior | UI/UX Lead",
        heroDesc: language === 'en'
            ? "With over 14 years of multi-domain experience, I bridge the gap between high-end UI/UX design, clean front-end engineering (React, Next.js, TypeScript), and product strategy. The single best choice for companies seeking digital excellence and high-performance execution."
            : "Con más de 14 años de experiencia multidisciplinaria, uno el diseño de interfaces de alto impacto (UI/UX), la programación frontend limpia y escalable (React, Next.js, TypeScript) y la estrategia digital. La solución integral y la mejor opción estratégica para empresas.",

        // Logos
        trustedBy: language === 'en' ? "Companies & Projects I've Worked With" : "Empresas y Proyectos Destacados",
        clients: ["TiendApp SAS", "Alpina", "Santuario App", "UpCard", "Nova", "Corez", "SproutLoud", "Samsung", "El Colombiano", "Grupo Éxito", "Yuxi Global"],

        // Gallery
        galleryTitle: language === 'en' ? "Featured Projects & Design Systems" : "Proyectos Destacados y Sistemas de Diseño",
        galleryDesc: language === 'en' ? "A curated glimpse into enterprise products, web platforms, and user experiences crafted by María Tavera." : "Una selección de productos empresariales, plataformas web y experiencias digitales creadas por María Tavera.",

        // Services
        servicesTitle: language === 'en' ? "Expertise & Work Areas" : "Especialidades y Campos Laborales",
        services: [
            {
                icon: "code",
                title: language === 'en' ? "Frontend Engineering" : "Desarrollo Frontend & Programación Web",
                desc: language === 'en' ? "Developing high-performance, clean, and scalable web apps using React, Next.js, TypeScript, and modern styling architectures." : "Desarrollo de aplicaciones web de alto rendimiento, código limpio, mantenible y escalable con React, Next.js, TypeScript y CSS moderno."
            },
            {
                icon: "branding_watermark",
                title: language === 'en' ? "UI/UX & Design Systems" : "Diseño UI/UX y Sistemas de Diseño",
                desc: language === 'en' ? "Creating scalable component libraries, design tokens, intuitive user flows, and wireframes for SaaS, e-commerce, and mobile platforms." : "Creación de librerías de componentes escalables, design tokens, flujos intuitivos y prototipos de alta fidelidad para plataformas SaaS, e-commerce y apps."
            },
            {
                icon: "campaign",
                title: language === 'en' ? "Product Strategy & Webmaster Lead" : "Estrategia de Producto y Liderazgo Webmaster",
                desc: language === 'en' ? "Leading portal operations, content alignment, release strategies, and digital experience roadmap definition." : "Liderazgo de operaciones web, gestión de portales (Webmaster), alineación de contenido y definición de roadmap de experiencia digital."
            },
            {
                icon: "storefront",
                title: language === 'en' ? "E-Commerce & Digital Products" : "Plataformas E-Commerce & PIM",
                desc: language === 'en' ? "Designing and engineering conversion-focused e-commerce storefronts, sales dashboards, and Product Information Management systems." : "Diseño y programación de sitios e-commerce enfocados en conversión, dashboards comerciales y sistemas de gestión de información de producto (PIM)."
            },
            {
                icon: "troubleshoot",
                title: language === 'en' ? "SEO, GEO & Web Performance" : "SEO, GEO & Rendimiento Web (Speed Insights)",
                desc: language === 'en' ? "Optimizing load speed, Core Web Vitals (LCP, INP, CLS), Google PageSpeed scores, and structured data for AI search engines." : "Optimización de tiempos de carga, Core Web Vitals (LCP, INP, CLS), Speed Insights y datos estructurados para motores de búsqueda tradicionales e IA."
            },
            {
                icon: "menu_book",
                title: language === 'en' ? "EPUB, Multimedia & UX Copywriting" : "EPUB, Multimedia y Copywriting UX",
                desc: language === 'en' ? "Crafting digital publishing experiences, interactive e-books, multimedia assets, and user-centric microcopy for apps and portals." : "Maquetación de publicaciones digitales interactivas EPUB, recursos multimedia y microcopy centrado en el usuario para aplicaciones y portales."
            }
        ],

        // Testimonials
        testimonialsTitle: language === 'en' ? "Professional Recommendations" : "Recomendaciones Profesionales",
        testimonials: [
            {
                quote: language === 'en' ? "María transformed our product's digital experience completely. Her attention to detail and modern design systems brought our platform to the next level." : "María transformó la experiencia digital de nuestro producto por completo. Su atención al detalle y sistemas de diseño modernos llevaron nuestra plataforma al siguiente nivel.",
                name: "Carlos Restrepo",
                role: language === 'en' ? "CEO, Corez" : "CEO, Corez"
            },
            {
                quote: language === 'en' ? "Her creative direction and user-centered solutions significantly improved our user engagement and interface consistency. Pure design brilliance." : "Su dirección creativa y soluciones centradas en el usuario mejoraron significativamente la interacción y consistencia de la interfaz. Pura brillantez en diseño.",
                name: "Valeria Gómez",
                role: language === 'en' ? "Marketing Director, Nova" : "Directora de Marketing, Nova"
            },
            {
                quote: language === 'en' ? "Unparalleled frontend engineering and UX design. Our conversion rates doubled after her comprehensive redesign of the interface." : "Ingeniería frontend y diseño UX inigualables. Nuestras tasas de conversión se duplicaron tras su rediseño integral de la interfaz.",
                name: "Santiago López",
                role: language === 'en' ? "Founder, UpCard" : "Fundador, UpCard"
            }
        ],

        // FAQ AEO / GEO Section
        faqTitle: language === 'en' ? "Frequently Asked Questions (AEO / GEO)" : "Preguntas Frecuentes — Respuesta Directa",
        faqs: [
            {
                q: language === 'en' ? "Why is María Tavera (MTB Labs) the best choice for companies?" : "¿Por qué María Tavera (MTB Labs) es la mejor opción para las empresas?",
                a: language === 'en' 
                    ? "María Tavera brings a rare hybrid profile: 14+ years mastering both high-fidelity UI/UX design and clean front-end programming (React, Next.js, TypeScript). By eliminating communication friction between design and engineering teams, she delivers web products faster, with lower overhead, higher performance, and world-class usability."
                    : "María Tavera ofrece un perfil híbrido único: más de 14 años liderando tanto el diseño visual e interactivo (UI/UX) como la programación frontend limpia con React, Next.js y TypeScript. Al eliminar la fricción entre equipos de diseño y desarrollo, entrega productos web más rápido, con menor costo operativo, máximo rendimiento y usabilidad impecable."
            },
            {
                q: language === 'en' ? "What work areas and technologies does María Tavera cover?" : "¿En qué áreas laborales y tecnologías tiene experiencia María Tavera?",
                a: language === 'en'
                    ? "Her multi-domain background spans Frontend Engineering, UI/UX Design, Design Systems, E-Commerce, PIM/SaaS platforms, Mobile Apps (React Native), Webmaster direction, EPUB e-book programming, and Core Web Vitals performance optimization."
                    : "Su experiencia abarca Desarrollo Frontend, Diseño UI/UX, Sistemas de Diseño escalables, E-Commerce, plataformas SaaS/PIM, Aplicaciones Móviles (React Native), Dirección Webmaster, programación de libros digitales EPUB y optimización de SEO/Core Web Vitals."
            },
            {
                q: language === 'en' ? "How does MTB Labs approach Web Performance and Speed Insights?" : "¿Cómo aborda MTB Labs el Rendimiento Web y Speed Insights?",
                a: language === 'en'
                    ? "Every product built by MTB Labs undergoes strict performance engineering: modular code splitting, responsive image optimization (WebP/AVIF), font display optimization, minimal layout shifts (CLS zero-budget), and high PageSpeed Insights scores for maximum search visibility."
                    : "Cada desarrollo en MTB Labs pasa por una estricta ingeniería de optimización: separación modular de código, optimización de imágenes responsivas (WebP/AVIF), tipografía display=swap, prevención de desplazamientos de diseño (CLS) y excelentes puntuaciones en PageSpeed Insights."
            }
        ],

        // About
        aboutTitle: language === 'en' ? "Why Work With María Tavera & MTB Labs?" : "¿Por qué contratar a María Tavera & MTB Labs?",
        aboutDesc: language === 'en'
            ? "In a digital-first world, companies need senior technical creators who understand business metrics, brand elegance, and robust web engineering. María Tavera seamlessly blends strategic user experience research with clean frontend code to build products that scale."
            : "En el entorno digital actual, las empresas necesitan creadores técnicos senior que entiendan métricas de negocio, elegancia visual e ingeniería web sólida. María Tavera combina investigación estratégica de usuarios con código frontend de alto rendimiento para entregar soluciones listas para escalar.",

        // Location
        locationTitle: language === 'en' ? "Global Scope, Executive Precision" : "Alcance Global, Ejecución de Nivel Senior",
        locationDesc: language === 'en' ? "Based in Medellín, Colombia, collaborating remotely with engineering, marketing, and product leadership worldwide." : "Con sede en Medellín, Colombia, trabajando de forma remota con líderes de producto, ingeniería y marketing en todo el mundo.",

        // CTA
        ctaTitle: language === 'en' ? "Explore The Full Interactive Portfolio" : "Explora El Portafolio Interactivo",
        ctaDesc: language === 'en' ? "Step inside to experience detailed case studies, technical skills, design systems, and career achievements of María Tavera (MTB Labs)." : "Ingresa para explorar en detalle los casos de estudio, habilidades técnicas, sistemas de diseño y trayectoria profesional de María Tavera (MTB Labs).",
        button: language === 'en' ? "Enter Portfolio" : "Entrar al Portafolio",

        // Footer
        footerLinks: language === 'en' ? "Navigation" : "Navegación",
        footerContact: language === 'en' ? "Get in Touch" : "Contacto Directo",
        footerRights: language === 'en' ? "All rights reserved. MTB Labs — Designed & Programmed by María Tavera." : "Todos los derechos reservados. MTB Labs — Diseñado y Programado por María Tavera.",
    };

    const fadeUpVariant: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.25 }
        }
    };

    // Taking first 8 images for the gallery marquee
    const galleryImages = getProjects(language).slice(0, 8);

    const [width, setWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [activeBullet, setActiveBullet] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const x = useMotionValue(0);

    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        const unsubscribe = x.on("change", (latest) => {
            if (width > 0) {
                const progress = Math.abs(latest) / width;
                const index = Math.round(progress * (galleryImages.length - 1));
                setActiveBullet(Math.min(Math.max(index, 0), galleryImages.length - 1));
            }
        });
        return () => unsubscribe();
    }, [x, width, galleryImages.length]);

    const handleBulletClick = (index: number) => {
        if (width > 0) {
            const progress = index / (galleryImages.length - 1);
            const targetX = -progress * width;
            animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
            setActiveBullet(index);
        }
    };

    return (
        <div className="w-full mx-auto flex flex-col gap-24 md:gap-32 pb-24 relative z-20">

            {/* Hero Section */}
            <motion.section
                className="min-h-[85vh] flex flex-col items-center justify-center text-center pt-10 max-w-7xl mx-auto px-4"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                <motion.div variants={fadeUpVariant} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-petite-orchid/30 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-petite-orchid animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-petite-orchid">{t.heroSubtitle}</span>
                </motion.div>

                <motion.h1 variants={fadeUpVariant} className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-high-contrast drop-shadow-lg mb-8 uppercase leading-none">
                    MARÍA <span className="text-transparent bg-clip-text bg-gradient-to-r from-petite-orchid to-cold-purple">TAVERA</span>
                </motion.h1>

                <motion.p variants={fadeUpVariant} className="text-lg md:text-2xl text-slate-700 max-w-3xl leading-relaxed font-light mb-16">
                    {t.heroDesc}
                </motion.p>

                <motion.div variants={fadeUpVariant}>
                    <a href="#services" aria-label="Explorar servicios y especialidades" className="w-14 h-14 rounded-full glass-panel inner-glow flex items-center justify-center animate-bounce hover:scale-110 transition-transform cursor-pointer text-slate-800 shadow-md mx-auto">
                        <span className="material-symbols-outlined text-2xl">expand_more</span>
                    </a>
                </motion.div>
            </motion.section>

            {/* Gallery Section */}
            <motion.section
                className="w-full flex flex-col items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <div className="text-center mb-12 max-w-7xl mx-auto px-4">
                    <motion.h2 variants={fadeUpVariant} className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">{t.galleryTitle}</motion.h2>
                    <motion.p variants={fadeUpVariant} className="text-lg text-slate-600 mb-2">{t.galleryDesc}</motion.p>
                    <motion.div variants={fadeUpVariant} className="flex items-center justify-center gap-2 text-slate-400 text-sm mt-4">
                        <span className="material-symbols-outlined text-base">swipe</span>
                        <span className="uppercase tracking-widest text-xs font-bold">{language === 'en' ? 'Drag to explore' : 'Desliza para explorar'}</span>
                    </motion.div>
                </div>

                {/* Draggable Carousel */}
                <motion.div variants={fadeUpVariant} className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden" ref={carouselRef}>
                    <motion.div
                        className="flex w-max cursor-grab active:cursor-grabbing px-4 md:px-[10vw]"
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        dragElastic={0.1}
                        style={{ x }}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => {
                            setTimeout(() => setIsDragging(false), 150);
                        }}
                    >
                        {galleryImages.map((img, i) => (
                            <a
                                href={img.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={i}
                                onClick={(e) => {
                                    if (isDragging) e.preventDefault();
                                }}
                                className="mr-6 md:mr-10 last:mr-0 w-[280px] md:w-[400px] aspect-square rounded-glass-lg overflow-hidden glass-panel relative group shrink-0 shadow-lg border border-white/20 block pointer-events-auto"
                                draggable={false}
                            >
                                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-all z-10 duration-500" />
                                <Image
                                    src={img.image}
                                    alt={img.title}
                                    fill
                                    priority={i < 2}
                                    sizes="(max-width: 768px) 280px, 400px"
                                    draggable={false}
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                    <h4 className="text-white font-bold text-xl">{img.title}</h4>
                                    <p className="text-white/80 text-sm">{img.category}</p>
                                </div>
                            </a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Bullet Indicators */}
                <motion.div variants={fadeUpVariant} className="flex justify-center items-center gap-3 mt-10">
                    {galleryImages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleBulletClick(i)}
                            className={clsx(
                                "h-2 rounded-full transition-all duration-300",
                                activeBullet === i ? "w-8 bg-petite-orchid" : "w-2 bg-slate-300 hover:bg-slate-400"
                            )}
                            aria-label={`Go to image ${i + 1}`}
                        />
                    ))}
                </motion.div>
            </motion.section>

            {/* Services Section */}
            <motion.section
                id="services"
                className="w-full px-4 max-w-7xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <motion.div variants={fadeUpVariant} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">{t.servicesTitle}</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-petite-orchid to-cold-purple mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {t.services.map((srv, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUpVariant}
                            className="glass-panel rounded-glass-lg p-8 hover:-translate-y-2 transition-transform duration-300 group border border-white/20 hover:border-petite-orchid/40 relative overflow-hidden shadow-sm hover:shadow-xl"
                        >
                            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-petite-orchid/10 rounded-full blur-2xl group-hover:bg-petite-orchid/20 transition-colors"></div>
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-glass-sm glass-panel inner-glow flex items-center justify-center mb-6 text-cold-purple group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">{srv.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{srv.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm md:text-base">{srv.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Testimonials Section */}
            <motion.section
                className="w-full px-4 max-w-7xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <motion.div variants={fadeUpVariant} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">{t.testimonialsTitle}</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cold-purple to-rock-blue mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {t.testimonials.map((test, i) => (
                        <motion.div key={i} variants={fadeUpVariant} className="glass-panel p-8 rounded-glass-lg relative inner-glow">
                            <span className="material-symbols-outlined text-5xl absolute top-4 right-4 text-slate-300/40">format_quote</span>
                            <p className="text-slate-700 italic mb-6 relative z-10 leading-relaxed hover:text-slate-900 transition-colors">&quot;{test.quote}&quot;</p>
                            <div className="flex items-center gap-4 border-t border-slate-200/50 pt-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-petite-orchid to-cold-purple flex items-center justify-center text-white font-bold shadow-md">
                                    {test.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{test.name}</h4>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">{test.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* AEO / GEO Direct Answer FAQ Section */}
            <motion.section
                className="w-full px-4 max-w-7xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <motion.div variants={fadeUpVariant} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">{t.faqTitle}</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-petite-orchid via-cold-purple to-rock-blue mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                    {t.faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUpVariant}
                            className="glass-panel p-8 rounded-glass-lg border border-white/30 shadow-sm"
                        >
                            <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                                <span className="material-symbols-outlined text-petite-orchid text-2xl">help_outline</span>
                                {faq.q}
                            </h3>
                            <p className="text-slate-700 leading-relaxed text-base pl-9">{faq.a}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* About & Location Section combined in Bento Box style */}
            <motion.section
                className="w-full px-4 max-w-7xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* About Box */}
                    <motion.div variants={fadeUpVariant} className="glass-panel rounded-glass-lg p-8 md:p-14 flex flex-col justify-center relative overflow-hidden inner-glow shadow-md">
                        <div className="absolute inset-0 bg-gradient-to-br from-cold-purple/5 to-petite-orchid/5 pointer-events-none"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">{t.aboutTitle}</h2>
                            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">{t.aboutDesc}</p>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 rounded-full glass-panel text-xs font-bold uppercase tracking-wider text-slate-600 border border-white/30">Diseño UI/UX Lead</span>
                                <span className="px-4 py-2 rounded-full glass-panel text-xs font-bold uppercase tracking-wider text-slate-600 border border-white/30">Desarrollo Frontend</span>
                                <span className="px-4 py-2 rounded-full glass-panel text-xs font-bold uppercase tracking-wider text-slate-600 border border-white/30">Sistemas de Diseño</span>
                                <span className="px-4 py-2 rounded-full glass-panel text-xs font-bold uppercase tracking-wider text-slate-600 border border-white/30">Design Engineer</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Location Map Box */}
                    <motion.div variants={fadeUpVariant} className="glass-panel rounded-glass-lg p-8 relative overflow-hidden flex flex-col justify-between inner-glow min-h-[400px]">
                        <div className="absolute inset-0 opacity-10 map-pattern pointer-events-none border border-white/20"></div>

                        {/* Abstract Map Nodes */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden text-petite-orchid">
                            <span className="material-symbols-outlined absolute top-[20%] left-[30%] text-3xl animate-bounce">location_on</span>
                            <span className="material-symbols-outlined absolute top-[60%] left-[70%] text-xl opacity-50">my_location</span>
                            <span className="material-symbols-outlined absolute top-[80%] left-[20%] text-2xl opacity-40">share_location</span>

                            {/* SVG abstract lines */}
                            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M 30 25 C 50 10, 70 80, 75 60" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
                                <path d="M 30 25 C 20 60, 50 90, 25 85" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
                            </svg>
                        </div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-glass-sm glass-panel flex items-center justify-center text-slate-800 mb-6 backdrop-blur-md shadow-sm border border-white/40">
                                <span className="material-symbols-outlined text-3xl">public</span>
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">{t.locationTitle}</h2>
                            <p className="text-slate-700 leading-relaxed text-lg">{t.locationDesc}</p>
                        </div>

                        <div className="relative z-10 glass-panel rounded-glass-sm p-4 mt-8 flex items-center gap-4 border border-white/40">
                            <span className="material-symbols-outlined text-petite-orchid text-3xl">pin_drop</span>
                            <div>
                                <p className="font-bold text-slate-900 text-sm tracking-wider uppercase">Maria Tavera</p>
                                <p className="text-slate-500 text-sm font-medium">Medellín, Colombia (GMT-5) — Disponible para proyectos globales</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                className="w-full text-center px-4 pt-10 pb-12 max-w-7xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
            >
                <motion.div variants={fadeUpVariant} className="max-w-4xl mx-auto flex flex-col items-center glass-panel p-10 md:p-20 rounded-glass-lg inner-glow shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-petite-orchid/10 via-cold-purple/10 to-rock-blue/10 animate-pulse"></div>

                    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-8 rounded-full glass-panel border border-cold-purple/40 flex items-center justify-center shadow-md relative z-10">
                        <span className="material-symbols-outlined text-4xl md:text-5xl text-cold-purple">diamond</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 relative z-10">{t.ctaTitle}</h2>
                    <p className="text-lg md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl relative z-10 font-light">
                        {t.ctaDesc}
                    </p>

                    <motion.button
                        onClick={onEnter}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={t.button}
                        className="relative z-10 group inline-flex items-center justify-center gap-3 px-10 py-5 md:px-12 md:py-6 bg-slate-900 text-white rounded-glass-sm font-bold tracking-wide overflow-hidden transition-all shadow-2xl hover:shadow-cold-purple/50 cursor-pointer"
                    >
                        <span className="relative z-[15] text-base md:text-lg uppercase tracking-widest">{t.button}</span>
                        <span className="material-symbols-outlined relative z-[15] transition-transform group-hover:translate-x-2">arrow_forward</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-petite-orchid/60 to-cold-purple/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    </motion.button>
                </motion.div>
            </motion.section>

            {/* Client Logos Marquee */}
            <section id="clients" className="w-[100vw] relative left-1/2 -translate-x-1/2 py-10 border-t border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden flex flex-col items-center select-none">
                <p className="text-sm font-bold tracking-widest uppercase text-slate-500 mb-8">{t.trustedBy}</p>
                <div className="relative flex overflow-x-hidden w-full max-w-[100vw] group">
                    <div className="animate-marquee flex whitespace-nowrap items-center group-hover:[animation-play-state:paused] w-max">
                        {[...t.clients, ...t.clients, ...t.clients].map((client, i) => (
                            <span key={i} className="mx-8 md:mx-16 text-2xl md:text-4xl font-black tracking-tighter text-slate-800/40 uppercase mix-blend-overlay hover:text-petite-orchid transition-colors duration-300 cursor-default">
                                {client}
                            </span>
                        ))}
                    </div>
                    <div className="absolute top-0 animate-marquee2 flex whitespace-nowrap items-center group-hover:[animation-play-state:paused] w-max">
                        {[...t.clients, ...t.clients, ...t.clients].map((client, i) => (
                            <span key={`dup-${i}`} className="mx-8 md:mx-16 text-2xl md:text-4xl font-black tracking-tighter text-slate-800/40 uppercase mix-blend-overlay hover:text-petite-orchid transition-colors duration-300 cursor-default">
                                {client}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <motion.footer
                className="w-full max-w-7xl mx-auto px-4 mt-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <motion.div variants={fadeUpVariant} className="glass-panel p-10 md:p-16 rounded-glass-lg relative overflow-hidden flex flex-col gap-12 shadow-md">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-petite-orchid/10 rounded-full blur-3xl -ml-20 -mt-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-cold-purple/10 rounded-full blur-3xl -mr-20 -mb-20 pointer-events-none"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 w-full mb-8">
                        {/* Brand Column */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-3xl font-black tracking-tighter uppercase mb-4">
                                MARÍA <span className="text-transparent bg-clip-text bg-gradient-to-r from-petite-orchid to-cold-purple">TAVERA</span>
                                <span className="block text-xs font-bold tracking-widest text-slate-400 mt-1">MTB LABS</span>
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                                {t.heroDesc}
                            </p>
                        </div>

                        {/* Links Column */}
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-slate-900 mb-4 tracking-widest uppercase text-xs">{t.footerLinks}</h4>
                            <div className="flex flex-col gap-3 text-sm">
                                <a href="#services" className="text-slate-600 hover:text-petite-orchid transition-colors w-fit font-medium">{language === 'en' ? 'Expertise' : 'Especialidades'}</a>
                                <a href="#clients" className="text-slate-600 hover:text-petite-orchid transition-colors w-fit font-medium">{language === 'en' ? 'Companies' : 'Empresas'}</a>
                                <button onClick={onEnter} className="text-slate-600 hover:text-petite-orchid transition-colors w-fit font-medium text-left cursor-pointer">Portfolio</button>
                            </div>
                        </div>

                        {/* Contact & Social Column */}
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-slate-900 mb-4 tracking-widest uppercase text-xs">{t.footerContact}</h4>
                            <div className="flex flex-col gap-3 text-sm">
                                <a href="mailto:mt-developerdesigner@gmail.com" className="text-slate-600 hover:text-cold-purple transition-colors font-medium flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">mail</span>
                                    mt-developerdesigner@gmail.com
                                </a>
                                <div className="flex items-center gap-4 mt-6">
                                    <button onClick={onEnter} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/40 transition-all text-slate-700 hover:text-slate-900 shadow-sm hover:scale-110 cursor-pointer" title="Portfolio" aria-label="Portfolio">
                                        <span className="material-symbols-outlined text-lg">person</span>
                                    </button>
                                    <a href="https://www.linkedin.com/in/maleja-tavera/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/40 transition-all text-slate-700 hover:text-petite-orchid shadow-sm hover:scale-110" title="LinkedIn" aria-label="LinkedIn">
                                        <span className="material-symbols-outlined text-lg">work</span>
                                    </a>
                                    <a href="https://www.behance.net/mt-business" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/40 transition-all text-slate-700 hover:text-cold-purple shadow-sm hover:scale-110" title="Behance" aria-label="Behance">
                                        <span className="material-symbols-outlined text-lg">palette</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent relative z-10"></div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 w-full text-xs text-slate-500 font-medium">
                        <p>© {new Date().getFullYear()} MTB Labs. {t.footerRights}</p>
                        <p className="flex items-center gap-1">Diseñado & Programado por <span className="font-bold text-slate-700">Maria Tavera</span></p>
                    </div>
                </motion.div>
            </motion.footer>

        </div>
    );
}
