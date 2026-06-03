"use client";

import ProjectPage from "@/components/ProjectPage";

export default function SitioWebContent() {
    return (
        <ProjectPage
            title="Sitio Web TiendApp"
            subtitle="Diseño Web Corporativo"
            description="Diseño e implementación del sitio web corporativo de TiendApp, enfocado en comunicar eficazmente la propuesta de valor de la plataforma omnicanal y sus productos. El sitio fue construido sobre Odoo Website Builder con personalización avanzada de HTML/CSS."
            role="Diseño UI/UX & Implementación Web"
            technologies={["Odoo Website Builder", "HTML", "CSS", "SEO", "Google Analytics"]}
            liveUrl="https://www.tiendapp.co/"
            backHref="/tiendapp"
            backLabel="Volver a TiendApp"
            accentColor="#c9a0a0"
            heroGradient="linear-gradient(135deg, #1a2332 0%, #2a3a4a 50%, #3d5060 100%)"
            features={[
                {
                    icon: "devices",
                    title: "Diseño Responsivo",
                    description: "Experiencia adaptada a todos los dispositivos con breakpoints optimizados para desktop, tablet y mobile."
                },
                {
                    icon: "conversion_path",
                    title: "Optimizado para Conversión",
                    description: "Arquitectura de información y CTAs estratégicos diseñados para guiar al visitante hacia la conversión."
                },
                {
                    icon: "search",
                    title: "SEO Optimizado",
                    description: "Estructura semántica, meta tags y contenido optimizado para posicionamiento en buscadores."
                },
                {
                    icon: "palette",
                    title: "Identidad Visual",
                    description: "Extensión de la identidad de marca de TiendApp con gradientes, tipografía e iconografía consistente."
                },
                {
                    icon: "speed",
                    title: "Performance",
                    description: "Optimización de carga con imágenes comprimidas y CSS eficiente para tiempos de respuesta rápidos."
                },
                {
                    icon: "hub",
                    title: "Integración de Productos",
                    description: "Páginas internas dedicadas para cada producto conectadas con la navegación principal del sitio."
                }
            ]}
            images={[
                {
                    src: "/tiendapp/sitio-web.png",
                    alt: "TiendApp — Hero principal del sitio web"
                }
            ]}
        />
    );
}
