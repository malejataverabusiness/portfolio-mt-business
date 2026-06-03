"use client";

import ProjectPage from "@/components/ProjectPage";

export default function TiendAppContent() {
    return (
        <ProjectPage
            title="TiendApp"
            subtitle="Plataforma Omnicanal con I.A."
            description="Plataforma integral de automatización comercial que combina e-commerce, Super App para fuerza de ventas, supervisión inteligente, gestión de productos y programas de fidelización. Diseñé el sitio web corporativo y la experiencia de usuario de los 4 productos digitales."
            role="Diseño UI/UX & Sitio Web"
            technologies={["Odoo", "HTML/CSS", "Figma", "UI/UX Design"]}
            liveUrl="https://www.tiendapp.co/"
            backHref="/"
            backLabel="Volver al Portafolio"
            accentColor="#c9a0a0"
            heroGradient="linear-gradient(135deg, #1a2332 0%, #243447 40%, #2e4058 70%, #384c68 100%)"
            images={[
                {
                    src: "https://www.tiendapp.co/web/image/2089-8a03e6d2/mockup-sav.svg",
                    alt: "TiendApp — Plataforma Omnicanal con I.A."
                }
            ]}
            metrics={[
                { value: "+14%", label: "Incremento en Ventas" },
                { value: "-8%", label: "Reducción de Costos" },
                { value: "360°", label: "Visibilidad del Negocio" },
                { value: "I.A.", label: "Inteligencia Artificial" }
            ]}
            subProjects={[
                {
                    title: "Sitio Web TiendApp",
                    description: "Diseño e implementación del sitio web corporativo de TiendApp con enfoque en conversión y posicionamiento.",
                    icon: "language",
                    href: "/tiendapp/sitio-web",
                    gradient: "linear-gradient(135deg, #2a3a4a, #3d5060)"
                },
                {
                    title: "Super APP Vendedor",
                    description: "App móvil para equipos comerciales con I.A., recomendaciones inteligentes y modo offline.",
                    icon: "phone_android",
                    href: "/tiendapp/super-app-vendedor",
                    gradient: "linear-gradient(135deg, #1e2d3d, #34495e)"
                },
                {
                    title: "E-commerce B2B - B2C",
                    description: "Plataforma de e-commerce omnicanal con WhatsApp Commerce y programas de lealtad.",
                    icon: "shopping_cart",
                    href: "/tiendapp/e-commerce",
                    gradient: "linear-gradient(135deg, #2c3e50, #4a6274)"
                },
                {
                    title: "Reportes BI",
                    description: "Business Intelligence con Power BI, tableros personalizados y analítica estratégica.",
                    icon: "bar_chart",
                    href: "/tiendapp/reportes-bi",
                    gradient: "linear-gradient(135deg, #3d3027, #5c4a3a)"
                },
                {
                    title: "PIM",
                    description: "Administrador centralizado de información de productos con sincronización multicanal.",
                    icon: "inventory_2",
                    href: "/tiendapp/pim",
                    gradient: "linear-gradient(135deg, #2a3040, #404858)"
                }
            ]}
        />
    );
}
