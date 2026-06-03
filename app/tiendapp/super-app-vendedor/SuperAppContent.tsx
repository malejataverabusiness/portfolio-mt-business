"use client";

import ProjectPage from "@/components/ProjectPage";

export default function SuperAppContent() {
    return (
        <ProjectPage
            title="Super APP Vendedor"
            subtitle="App Móvil con Inteligencia Artificial"
            description="Aplicación móvil potenciada por I.A. diseñada para equipos comerciales. Permite tomar pedidos, gestionar rutas de visita, recibir recomendaciones inteligentes de productos y funcionar en modo offline para vendedores en campo."
            role="Diseño UI/UX"
            technologies={["Figma", "UI/UX Design", "Mobile App", "I.A."]}
            liveUrl="https://www.tiendapp.co/super-app-vendedor"
            backHref="/tiendapp"
            backLabel="Volver a TiendApp"
            accentColor="#c9a0a0"
            heroGradient="linear-gradient(135deg, #1e2d3d 0%, #2a3d50 50%, #34495e 100%)"
            features={[
                {
                    icon: "smart_toy",
                    title: "Inteligencia Artificial",
                    description: "Motor de I.A. que analiza patrones de compra y sugiere productos, cantidades y frecuencia óptima por cliente."
                },
                {
                    icon: "recommend",
                    title: "Recomendaciones Inteligentes",
                    description: "Sugerencias personalizadas basadas en historial de compras, temporadas y tendencias del mercado."
                },
                {
                    icon: "location_on",
                    title: "GPS & Rutas",
                    description: "Geolocalización en tiempo real, optimización de rutas de visita y registro automático de cobertura."
                },
                {
                    icon: "wifi_off",
                    title: "Modo Offline",
                    description: "Funcionalidad completa sin conexión a internet con sincronización automática al recuperar señal."
                },
                {
                    icon: "groups",
                    title: "Segmentación de Clientes",
                    description: "Clasificación inteligente de clientes por potencial, frecuencia de compra y comportamiento."
                },
                {
                    icon: "monitoring",
                    title: "Torre de Control",
                    description: "Panel de supervisión para gerentes con visibilidad en tiempo real de la fuerza de ventas en campo."
                },
                {
                    icon: "inventory",
                    title: "Catálogo Digital",
                    description: "Catálogo interactivo de productos con fotos, precios, disponibilidad y promociones vigentes."
                },
                {
                    icon: "receipt_long",
                    title: "Toma de Pedidos",
                    description: "Proceso ágil de captura de pedidos con validación de inventario y condiciones comerciales en tiempo real."
                },
                {
                    icon: "notifications_active",
                    title: "Alertas Inteligentes",
                    description: "Notificaciones proactivas sobre clientes sin visitar, pedidos pendientes y oportunidades de venta."
                }
            ]}
            images={[
                {
                    src: "https://www.tiendapp.co/web/image/2089-8a03e6d2/mockup-sav.svg",
                    alt: "Super APP Vendedor — Mockup de la aplicación móvil"
                }
            ]}
        />
    );
}
