"use client";

import ProjectPage from "@/components/ProjectPage";

export default function EcommerceContent() {
    return (
        <ProjectPage
            title="E-commerce B2B - B2C"
            subtitle="Plataforma Omnicanal de Comercio Electrónico"
            description="Plataforma de e-commerce que unifica ventas B2B y B2C en un solo ecosistema. Integra WhatsApp Commerce para venta conversacional, programas de lealtad con billetera virtual, y publicidad inteligente para maximizar conversiones."
            role="Diseño UI/UX"
            technologies={["Figma", "UI/UX Design", "E-commerce", "WhatsApp API"]}
            liveUrl="https://www.tiendapp.co/e-commerce"
            backHref="/tiendapp"
            backLabel="Volver a TiendApp"
            accentColor="#c9a0a0"
            heroGradient="linear-gradient(135deg, #1a2535 0%, #2c3e50 60%, #3d5266 100%)"
            features={[
                {
                    icon: "storefront",
                    title: "Omnicanalidad",
                    description: "Experiencia de compra unificada a través de web, móvil, WhatsApp y puntos de venta físicos."
                },
                {
                    icon: "chat",
                    title: "WhatsApp Commerce",
                    description: "Venta conversacional a través de WhatsApp con catálogo, carrito y checkout integrados."
                },
                {
                    icon: "loyalty",
                    title: "Programa de Lealtad",
                    description: "Sistema de puntos, recompensas y billetera virtual que incentiva la recompra y fidelización."
                },
                {
                    icon: "account_balance_wallet",
                    title: "Billetera Virtual",
                    description: "Monedero digital para clientes con acumulación de puntos y redención en compras futuras."
                },
                {
                    icon: "campaign",
                    title: "Publicidad Inteligente",
                    description: "Campañas segmentadas con push notifications, banners personalizados y ofertas dinámicas."
                },
                {
                    icon: "analytics",
                    title: "Analytics de Ventas",
                    description: "Dashboard con métricas de conversión, carritos abandonados, tickets promedio y comportamiento de compra."
                },
                {
                    icon: "local_shipping",
                    title: "Gestión de Envíos",
                    description: "Integración con operadores logísticos, tracking en tiempo real y notificaciones de estado."
                },
                {
                    icon: "tune",
                    title: "Personalización B2B",
                    description: "Precios diferenciados por cliente, condiciones comerciales, crédito y flujos de aprobación."
                }
            ]}
            images={[
                {
                    src: "https://www.tiendapp.co/web/image/2062-e10f14f4/mockup-e-comm%20%281%29.svg",
                    alt: "E-commerce B2B-B2C — Plataforma omnicanal"
                }
            ]}
        />
    );
}
