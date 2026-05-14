import { motion, Variants, useMotionValue, animate } from "framer-motion";
import clsx from "clsx";
import { projects } from "./Projects";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface LandingProps {
    onEnter: () => void;
    language: 'en' | 'es';
}

export default function Landing({ onEnter, language }: LandingProps) {
    const t = {
        agencyTitle: "MT BUSINESS",
        heroSubtitle: language === 'en' ? "Digital Advertising Agency" : "Agencia de Publicidad Digital",
        heroDesc: language === 'en'
            ? "We craft immersive digital experiences, pushing the boundaries of technology, design, and marketing to elevate your brand to the next level."
            : "Creamos experiencias digitales inmersivas, superando los límites de la tecnología, el diseño y el marketing para elevar tu marca al siguiente nivel.",

        // Logos
        trustedBy: language === 'en' ? "Trusted By Industry Leaders" : "Empresas que Confían en Nosotros",
        clients: ["Cabaña Alpina", "UpCard", "Nova", "Corez Inmobiliaria", "Cueros Vélez", "Prolírica", "Hotel Parnassus", "Kaskey"],

        // Gallery
        galleryTitle: language === 'en' ? "Selected Works" : "Obras Destacadas",
        galleryDesc: language === 'en' ? "A glimpse into our visual universe." : "Un vistazo a nuestro universo visual.",

        // Services
        servicesTitle: language === 'en' ? "Our Expertise" : "Nuestra Experiencia",
        services: [
            {
                icon: "campaign",
                title: language === 'en' ? "Digital Marketing" : "Marketing Digital",
                desc: language === 'en' ? "Data-driven campaigns that convert audiences into loyal customers through targeted strategies." : "Campañas basadas en datos que convierten audiencias en clientes leales mediante estrategias dirigidas."
            },
            {
                icon: "branding_watermark",
                title: language === 'en' ? "Brand Identity" : "Identidad de Marca",
                desc: language === 'en' ? "Crafting memorable brands with unique visual languages and strong, recognizable presences." : "Creación de marcas memorables con lenguajes visuales únicos y presencias sólidas y reconocibles."
            },
            {
                icon: "code",
                title: language === 'en' ? "Web & App Dev" : "Desarrollo Web y App",
                desc: language === 'en' ? "High-performance, scalable, and visually stunning digital products tailored to your needs." : "Productos digitales de alto rendimiento, escalables y visualmente impactantes adaptados a tus necesidades."
            },
            {
                icon: "share",
                title: language === 'en' ? "Social Media" : "Redes Sociales",
                desc: language === 'en' ? "Engaging content strategies that amplify your voice and build community across platforms." : "Estrategias de contenido atractivas que amplifican tu voz y construyen comunidad en todas las plataformas."
            },
            {
                icon: "troubleshoot",
                title: language === 'en' ? "SEO & Analytics" : "SEO y Analítica",
                desc: language === 'en' ? "Optimizing visibility and tracking key metrics to guarantee continuous and sustainable growth." : "Optimización de visibilidad y seguimiento de métricas clave para garantizar un crecimiento continuo y sostenible."
            },
            {
                icon: "movie_creation",
                title: language === 'en' ? "Content Creation" : "Creación de Contenido",
                desc: language === 'en' ? "Producing high-quality video, imagery, and copywriting that effectively tells your story." : "Producción de video, imágenes y copywriting de alta calidad que cuentan tu historia de manera efectiva."
            }
        ],

        // Testimonials
        testimonialsTitle: language === 'en' ? "What Our Clients Say" : "Lo Que Dicen Nuestros Clientes",
        testimonials: [
            {
                quote: language === 'en' ? "MT Business transformed our digital presence completely. The attention to detail and modern aesthetic brought our brand into 2026 seamlessly." : "MT Business transformó nuestra presencia digital por completo. La atención al detalle y la estética moderna llevaron nuestra marca al 2026 sin problemas.",
                name: "Carlos Restrepo",
                role: language === 'en' ? "CEO, Corez Inmobiliaria" : "CEO, Corez Inmobiliaria"
            },
            {
                quote: language === 'en' ? "The creative direction for our social media campaigns skyrocketed our engagement. Pure design brilliance." : "La dirección creativa de nuestras campañas en redes sociales disparó nuestro engagement. Pura brillantez en diseño.",
                name: "Valeria Gómez",
                role: language === 'en' ? "Marketing Director, Nova" : "Directora de Marketing, Nova"
            },
            {
                quote: language === 'en' ? "Unparalleled frontend development and UX. Our e-commerce conversion rates doubled after the redesign." : "Desarrollo frontend y UX inigualables. Nuestras tasas de conversión en e-commerce se duplicaron tras el rediseño.",
                name: "Santiago López",
                role: language === 'en' ? "Founder, UpCard" : "Fundador, UpCard"
            }
        ],

        // About
        aboutTitle: language === 'en' ? "Why MT Business?" : "¿Por qué MT Business?",
        aboutDesc: language === 'en'
            ? "In a digital-first world, simply existing isn't enough. You need to stand out. Our multidisciplinary approach seamlessly blends aesthetic design, robust engineering, and strategic marketing to ensure your brand doesn't just compete—it leads."
            : "En un mundo digital, simplemente existir no es suficiente. Necesitas destacar. Nuestro enfoque multidisciplinario combina a la perfección el diseño estético, la ingeniería robusta y el marketing estratégico para asegurar que tu marca no solo compita, sino que lidere el mercado.",

        // Location
        locationTitle: language === 'en' ? "Global Reach, Local Touch" : "Alcance Global, Toque Local",
        locationDesc: language === 'en' ? "Based in Medellín, Colombia, working with visionary brands worldwide." : "Con sede en Medellín, Colombia, trabajando con marcas visionarias en todo el mundo.",

        // CTA
        ctaTitle: language === 'en' ? "Meet the Creative Mind" : "Conoce a la Mente Creativa",
        ctaDesc: language === 'en' ? "Behind every great agency is a visionary. Step inside to see the portfolio of our founder, María Tavera." : "Detrás de toda gran agencia hay una visionaria. Entra para ver el portafolio de nuestra fundadora, María Tavera.",
        button: language === 'en' ? "Enter Portfolio" : "Entrar al Portafolio",

        // Footer
        footerLinks: language === 'en' ? "Navigation" : "Navegación",
        footerContact: language === 'en' ? "Get in Touch" : "Contacto",
        footerRights: language === 'en' ? "All rights reserved. Designed in Medellín, Colombia." : "Todos los derechos reservados. Diseñado en Medellín, Colombia.",
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
    const galleryImages = projects.slice(0, 8);

    const [width, setWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [activeBullet, setActiveBullet] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const x = useMotionValue(0);

    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                // Calculate scrollable width minus visible viewport width
                setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    // Sync bullets to drag translation
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
                    MT <span className="text-transparent bg-clip-text bg-gradient-to-r from-petite-orchid to-cold-purple">Business</span>
                </motion.h1>

                <motion.p variants={fadeUpVariant} className="text-lg md:text-2xl text-slate-700 max-w-3xl leading-relaxed font-light mb-16">
                    {t.heroDesc}
                </motion.p>

                <motion.div variants={fadeUpVariant}>
                    <a href="#clients" className="w-14 h-14 rounded-full glass-panel inner-glow flex items-center justify-center animate-bounce hover:scale-110 transition-transform cursor-pointer text-slate-800 shadow-md mx-auto">
                        <span className="material-symbols-outlined text-2xl">expand_more</span>
                    </a>
                </motion.div>
            </motion.section>

            {/* Modern Drag & Drop Gallery Section */}
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
                            <p className="text-slate-700 italic mb-6 relative z-10 leading-relaxed hover:text-slate-900 transition-colors">"{test.quote}"</p>
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
                            <div className="flex gap-4">
                                <span className="px-4 py-2 rounded-full glass-panel text-xs font-bold uppercase tracking-wider text-slate-600 border border-white/30">Strategy</span>
                                <span className="px-4 py-2 rounded-full glass-panel text-xs font-bold uppercase tracking-wider text-slate-600 border border-white/30">Design</span>
                                <span className="px-4 py-2 rounded-full glass-panel text-xs font-bold uppercase tracking-wider text-slate-600 border border-white/30">Code</span>
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
                                <p className="font-bold text-slate-900 text-sm tracking-wider uppercase">Headquarters</p>
                                <p className="text-slate-500 text-sm font-medium">Medellín, Colombia (GMT-5)</p>
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
                        className="relative z-10 group inline-flex items-center justify-center gap-3 px-10 py-5 md:px-12 md:py-6 bg-slate-900 text-white rounded-glass-sm font-bold tracking-wide overflow-hidden transition-all shadow-2xl hover:shadow-cold-purple/50"
                    >
                        <span className="relative z-[15] text-base md:text-lg uppercase tracking-widest">{t.button}</span>
                        <span className="material-symbols-outlined relative z-[15] transition-transform group-hover:translate-x-2">arrow_forward</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-petite-orchid/60 to-cold-purple/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    </motion.button>
                </motion.div>
            </motion.section>

            {/* Client Logos Marquee (Moved to Bottom) */}
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

            {/* Beautiful Agency Footer */}
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
                                MT <span className="text-transparent bg-clip-text bg-gradient-to-r from-petite-orchid to-cold-purple">Business</span>
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                                {t.heroDesc}
                            </p>
                        </div>

                        {/* Links Column */}
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-slate-900 mb-4 tracking-widest uppercase text-xs">{t.footerLinks}</h4>
                            <div className="flex flex-col gap-3 text-sm">
                                <a href="#services" className="text-slate-600 hover:text-petite-orchid transition-colors w-fit font-medium">Services</a>
                                <a href="#clients" className="text-slate-600 hover:text-petite-orchid transition-colors w-fit font-medium">Clients</a>
                                <button onClick={onEnter} className="text-slate-600 hover:text-petite-orchid transition-colors w-fit font-medium text-left">Portfolio</button>
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
                                    <button onClick={onEnter} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/40 transition-all text-slate-700 hover:text-slate-900 shadow-sm hover:scale-110" title="Portfolio">
                                        <span className="material-symbols-outlined text-lg">person</span>
                                    </button>
                                    <a href="https://www.linkedin.com/in/maleja-tavera/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/40 transition-all text-slate-700 hover:text-petite-orchid shadow-sm hover:scale-110" title="LinkedIn">
                                        <span className="material-symbols-outlined text-lg">work</span>
                                    </a>
                                    <a href="https://www.behance.net/mt-business" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/40 transition-all text-slate-700 hover:text-cold-purple shadow-sm hover:scale-110" title="Behance">
                                        <span className="material-symbols-outlined text-lg">palette</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent relative z-10"></div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 w-full text-xs text-slate-500 font-medium">
                        <p>© {new Date().getFullYear()} MT Business. {t.footerRights}</p>
                        <p className="flex items-center gap-1">Made with <span className="text-red-400">❤</span> by María Tavera</p>
                    </div>
                </motion.div>
            </motion.footer>

        </div >
    );
}
