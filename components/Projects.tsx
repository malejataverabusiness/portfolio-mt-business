"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const projects = [
    {
        id: 1,
        title: "Cabaña Alpina",
        category: "Graphic Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/10a7c3241831361.Y3JvcCwxNjI3LDEyNzIsMCwxNTQy.png",
        description: "Digital experience design for Cabaña Alpina.",
        link: "https://www.behance.net/gallery/241831361/Cabana-Alpina"
    },
    {
        id: 2,
        title: "Landing UpCard",
        category: "Graphic Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/2b234f241829125.Y3JvcCw0MzIwLDMzNzksMCww.jpg",
        description: "Landing page design for UpCard fintech solution.",
        link: "https://www.behance.net/gallery/241829125/Landing-UpCard"
    },
    {
        id: 3,
        title: "Piezas Gráficas Digitales - Nova",
        category: "Web Design, Branding, Fashion",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/e01900239353155.Y3JvcCwxMDgwLDg0NCwwLDIzMg.png",
        description: "Digital graphic assets and branding for Nova.",
        link: "https://www.behance.net/gallery/239353155/Piezas-Graficas-Digitales-Nova"
    },
    {
        id: 4,
        title: "Sitio web E-commerce",
        category: "Graphic Design, Advertising, Product Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/298ccc196617331.Y3JvcCwyODc4LDIyNTEsMCw1MzY0.png",
        description: "Comprehensive e-commerce website design.",
        link: "https://www.behance.net/gallery/196617331/Sitio-web-E-commerce"
    },
    {
        id: 5,
        title: "Mascothings - Pet Furniture Store",
        category: "Graphic Design, Illustration, Advertising",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/5aecf0185922065.Y3JvcCw0MjYxLDMzMzMsNTM3LDA.png",
        description: "Pet furniture store branding and web design.",
        link: "https://www.behance.net/gallery/185922065/Mascothings-Pet-Furniture-Store"
    },
    {
        id: 6,
        title: "Sitio web Rethinking Agency",
        category: "Graphic Design, Web Design, UI/UX",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/28f2ce175337617.Y3JvcCwyMDE1LDE1NzYsMCww.png",
        description: "Agency website redesign focusing on modern aesthetics.",
        link: "https://www.behance.net/gallery/175337617/Sitio-web-Rethinking-Agency"
    },
    {
        id: 7,
        title: "Eleden - Candles & Home wellness",
        category: "Graphic Design, Photography, Advertising",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/ec4d0c185919873.Y3JvcCwxOTk5LDE1NjQsMCwyMTc.png",
        description: "Branding and web design for Eleden home wellness.",
        link: "https://www.behance.net/gallery/185919873/Eleden-Candles-Home-wellness"
    },
    {
        id: 8,
        title: "Sitio Web Corez Inmobiliaria",
        category: "Graphic Design, Photography, Advertising",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/d6f232149696815.Y3JvcCwyODgwLDIyNTIsMCw1MDY.png",
        description: "Real estate website design for Corez Inmobiliaria.",
        link: "https://www.behance.net/gallery/149696815/Sitio-Web-Corez-Inmobiliaria"
    },
    {
        id: 9,
        title: "Sitio Web Juan Pablo Gómez",
        category: "Photography, Graphic Design, Advertising",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/2da8e0149697561.Y3JvcCwyODgwLDIyNTIsMCww.png",
        description: "Personal portfolio website design.",
        link: "https://www.behance.net/gallery/149697561/Sitio-Web-Juan-Pablo-Gomez"
    },
    {
        id: 10,
        title: "Signature Brand",
        category: "Photography, Graphic Design, Product Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/4d7810175334963.Y3JvcCw5ODIsNzY4LDM3MSww.png",
        description: "Brand identity design.",
        link: "https://www.behance.net/gallery/175334963/Signature-Brand"
    },
    {
        id: 11,
        title: "Posts - Evento The Carfest (Fiestas Sabaneta - Ant.)",
        category: "Graphic Design, Illustration, Photography",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/36d10d174575649.Y3JvcCwxMDgwLDg0NCwwLDIyMQ.png",
        description: "Social media posts for The Carfest event.",
        link: "https://www.behance.net/gallery/174575649/Posts-Evento-The-Carfest-(Fiestas-Sabaneta-Ant)"
    },
    {
        id: 12,
        title: "Hotel Parnassus",
        category: "Web Design, UI/UX, Graphic Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/e0605471283379.Y3JvcCwxNTAwLDExNzMsMCwxNA.jpg",
        description: "Hotel branding and website concept.",
        link: "https://www.behance.net/gallery/71283379/Hotel-Parnassus"
    },
    {
        id: 13,
        title: "Social Media Design",
        category: "Graphic Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/1ab121142608527.Y3JvcCwxNjAzLDEyNTQsMCwxOTg.png",
        description: "Creative social media design compilation.",
        link: "https://www.behance.net/gallery/142608527/Social-Media-Design"
    },
    {
        id: 14,
        title: "Rebranding BBR",
        category: "Illustration, Graphic Design, Advertising",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/f1c4a6185921721.Y3JvcCwxNDM4LDExMjUsMzIsMA.png",
        description: "Rebranding project for BBR.",
        link: "https://www.behance.net/gallery/185921721/Rebranding-BBR"
    },
    {
        id: 15,
        title: "Diseño Sección Perfil",
        category: "Graphic Design, Interaction Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/0cd883142608059.Y3JvcCwxNDQwLDExMjYsMCww.png",
        description: "User profile section UI design.",
        link: "https://www.behance.net/gallery/142608059/Diseno-Seccion-Perfil"
    },
    {
        id: 16,
        title: "Diseño Interna Recetas",
        category: "Graphic Design, Interaction Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/cd8ac9142608003.Y3JvcCwxNDQwLDExMjYsMCww.png",
        description: "Recipe inner page UI design.",
        link: "https://www.behance.net/gallery/142608003/Diseno-Interna-Recetas"
    },
    {
        id: 17,
        title: "Email Marketing",
        category: "Graphic Design, Interaction Design, Advertising",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/7ae800142607825.Y3JvcCwxMDgwLDg0NCwwLDA.png",
        description: "Email marketing campaign designs.",
        link: "https://www.behance.net/gallery/142607825/Email-Marketing"
    },
    {
        id: 18,
        title: "Copper Home Store - Branding",
        category: "Graphic Design, Photography, Product Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/2cdc09142190917.Y3JvcCwxNzA0LDEzMzMsMTQ3LDA.png",
        description: "Branding for Copper Home Store.",
        link: "https://www.behance.net/gallery/142190917/Copper-Home-Store-Branding"
    },
    {
        id: 19,
        title: "Diseño e Implementación de Landing Page",
        category: "Painting, Digital Painting, Programming",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/394b10138656605.Y3JvcCwxMjgwLDEwMDEsMCww.png",
        description: "Landing page design and implementation.",
        link: "https://www.behance.net/gallery/138656605/Diseno-e-Implementacion-de-Landing-Page"
    },
    {
        id: 20,
        title: "Diseño Teatro Virtual Fundación Prolírica de Antioquia",
        category: "Graphic Design, Programming, Interaction Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/baaf56138656181.Y3JvcCwxMDgwLDg0NSwzMTIsMTA0.png",
        description: "Virtual theater design for Prolírica Foundation.",
        link: "https://www.behance.net/gallery/138656181/Diseno-Teatro-Virtual-Fundacion-Prolirica-de-Antioquia"
    },
    {
        id: 21,
        title: "Diseño Sitio Web Kaskey",
        category: "Graphic Design, Interaction Design, Architecture",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/e6cdae138655521.Y3JvcCwxNDQwLDExMjYsMCww.png",
        description: "Website design for Kaskey.",
        link: "https://www.behance.net/gallery/138655521/Diseno-Sitio-Web-Kaskey"
    },
    {
        id: 22,
        title: "Diseño Editorial para Proyecto de Bien Social - CEFF",
        category: "Photography, Graphic Design, Illustration",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/5efbf393976663.Y3JvcCwxNDgwLDExNTcsMTk0LDk4.jpg",
        description: "Editorial design for social good project CEFF.",
        link: "https://www.behance.net/gallery/93976663/Diseno-Editorial-para-Proyecto-de-Bien-Social-CEFF"
    },
    {
        id: 23,
        title: "Gran Fondo Quindío - Strongman",
        category: "Illustration, Branding, Motion Graphics",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/e5c8a071283757.Y3JvcCw5MDMsNzA2LDE3LDMyNA.jpg",
        description: "Branding for Gran Fondo Quindío event.",
        link: "https://www.behance.net/gallery/71283757/Gran-Fondo-Quindio-Strongman"
    },
    {
        id: 24,
        title: "Cueros Vélez - Home",
        category: "Web Design, Branding, Fashion",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/fac4aa71283469.Y3JvcCwyODc2LDIyNTAsNjQsMA.jpg",
        description: "Home page design for Cueros Vélez.",
        link: "https://www.behance.net/gallery/71283469/Cueros-Vlez-Home"
    },
    {
        id: 25,
        title: "Esensi",
        category: "Graphic Design, Web Design, UI/UX",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/fd847961513359.Y3JvcCwxNDAzLDEwOTgsMCw5Nw.png",
        description: "Design project for Esensi.",
        link: "https://www.behance.net/gallery/61513359/Esensi"
    },
    {
        id: 26,
        title: "+KOTAS",
        category: "Web Design, Graphic Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/1ad66556921227.Y3JvcCwxMTUzLDkwMiwxMzMsMA.png",
        description: "Branding and design for +KOTAS.",
        link: "https://www.behance.net/gallery/56921227/KOTAS"
    },
    {
        id: 27,
        title: "Grafty",
        category: "UI/UX, Web Design, Programming",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/2704aa56184131.Y3JvcCw5NzYsNzY0LDEyMCww.png",
        description: "Design project for Grafty.",
        link: "https://www.behance.net/gallery/56184131/Grafty"
    },
    {
        id: 28,
        title: "Fundación Óyeme",
        category: "Graphic Design, Web Design, UI/UX",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/a640f354515205.Y3JvcCw2ODcsNTM4LDcxLDE2OA.jpg",
        description: "Design for Fundación Óyeme.",
        link: "https://www.behance.net/gallery/54515205/Fundacion-Oyeme"
    },
    {
        id: 29,
        title: "Boamar Swimwear",
        category: "UI/UX, Web Design, Graphic Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/91c1c753051803.Y3JvcCwxMDM0LDgwOSwzMjksMjU.jpg",
        description: "Design work for Boamar Swimwear.",
        link: "https://www.behance.net/gallery/53051803/Boamar-Swimwear"
    },
    {
        id: 30,
        title: "La Bottega Verde",
        category: "Web Design, UI/UX, Graphic Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/442b6953005159.Y3JvcCw5OTQsNzc4LDQ2LDk.jpg",
        description: "Branding for La Bottega Verde.",
        link: "https://www.behance.net/gallery/53005159/La-Bottega-Verde"
    },
    {
        id: 31,
        title: "Vista Global",
        category: "Web Design, UI/UX, Programming",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/687d1f43301295.Y3JvcCwxNDAzLDEwOTgsMCwzNA.jpg",
        description: "Design project for Vista Global.",
        link: "https://www.behance.net/gallery/43301295/Vista-Global"
    }
];

export default function Projects({ onBack }: { onBack: () => void }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto h-full flex flex-col">
            <div className="flex-none flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Recent Projects</h2>
                <button
                    onClick={onBack}
                    className="bg-white/10 hover:bg-white/20 text-slate-900 transition-all rounded-full p-2 flex items-center gap-2 px-4 shadow-sm border border-white/20 backdrop-blur-md"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    <span className="text-sm font-medium">Back</span>
                </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto pb-4 custom-scrollbar pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group rounded-glass-md overflow-hidden glass-panel border border-white/30 shadow-sm hover:shadow-md transition-all cursor-pointer bg-white/10 block"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all z-10" />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/90 text-slate-900 rounded-full shadow-sm">
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-petite-orchid transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                    {project.description}
                                </p>
                                <div className="flex items-center text-sm font-bold text-slate-800">
                                    View Project
                                    <span className="material-symbols-outlined ml-2 text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
}
