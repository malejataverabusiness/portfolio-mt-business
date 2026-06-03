"use client";

import ProjectPage from "@/components/ProjectPage";

export default function ReportesBIContent() {
    return (
        <ProjectPage
            title="Reportes BI"
            subtitle="Business Intelligence & Analytics"
            description="Módulo de inteligencia de negocios que transforma datos de ventas, inventario y operaciones en insights accionables. Powered by Power BI con tableros personalizados y repositorios de datos unificados para toma de decisiones estratégicas."
            role="Diseño UI/UX"
            technologies={["Figma", "UI/UX Design", "Power BI", "Data Visualization"]}
            liveUrl="https://www.tiendapp.co/reportes-bi"
            backHref="/tiendapp"
            backLabel="Volver a TiendApp"
            accentColor="#c9a0a0"
            heroGradient="linear-gradient(135deg, #2a2520 0%, #3d3027 50%, #504038 100%)"
            features={[
                {
                    icon: "dashboard",
                    title: "Tableros Personalizados",
                    description: "Dashboards configurables por rol con KPIs relevantes para cada nivel de la organización."
                },
                {
                    icon: "storage",
                    title: "Repositorios de Datos",
                    description: "Consolidación de datos de múltiples fuentes en un repositorio unificado para análisis integral."
                },
                {
                    icon: "trending_up",
                    title: "Analítica Estratégica",
                    description: "Análisis de tendencias, pronósticos de demanda y correlaciones para decisiones informadas."
                },
                {
                    icon: "pie_chart",
                    title: "Visualización de Datos",
                    description: "Gráficos interactivos, mapas de calor y tablas dinámicas para exploración de datos intuitiva."
                },
                {
                    icon: "schedule",
                    title: "Reportes Automatizados",
                    description: "Generación y envío automático de reportes periódicos a los stakeholders relevantes."
                },
                {
                    icon: "filter_alt",
                    title: "Filtros Avanzados",
                    description: "Capacidad de drill-down por región, producto, vendedor, período y múltiples dimensiones."
                }
            ]}
            images={[
                {
                    src: "https://www.tiendapp.co/web/image/2086-2f56c895/mockup-bi-analytics.svg",
                    alt: "Reportes BI — Dashboard de Business Intelligence"
                }
            ]}
        />
    );
}
