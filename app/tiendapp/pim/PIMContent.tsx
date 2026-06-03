"use client";

import ProjectPage from "@/components/ProjectPage";

export default function PIMContent() {
    return (
        <ProjectPage
            title="PIM"
            subtitle="Product Information Management"
            description="Sistema centralizado para la administración de información de productos. Permite gestionar catálogos, atributos, imágenes y descripciones desde un solo lugar, sincronizando automáticamente con todos los canales de venta."
            role="Diseño UI/UX"
            technologies={["Figma", "UI/UX Design", "Data Management"]}
            liveUrl="https://www.tiendapp.co/pim"
            backHref="/tiendapp"
            backLabel="Volver a TiendApp"
            accentColor="#c9a0a0"
            heroGradient="linear-gradient(135deg, #1e2430 0%, #2a3040 50%, #3a4050 100%)"
            features={[
                {
                    icon: "database",
                    title: "Centralización de Datos",
                    description: "Repositorio único para toda la información de productos: descripciones, precios, imágenes y atributos."
                },
                {
                    icon: "admin_panel_settings",
                    title: "Control de Usuarios",
                    description: "Roles y permisos granulares para controlar quién puede editar, aprobar o publicar información."
                },
                {
                    icon: "sync",
                    title: "Sincronización Multicanal",
                    description: "Actualización automática de información en e-commerce, app, marketplace y puntos de venta."
                },
                {
                    icon: "verified",
                    title: "Flujo de Aprobación",
                    description: "Workflow de revisión y aprobación antes de publicar cambios en los canales de venta."
                },
                {
                    icon: "photo_library",
                    title: "Gestión de Medios",
                    description: "Biblioteca multimedia centralizada con optimización automática de imágenes y formatos."
                },
                {
                    icon: "category",
                    title: "Taxonomía de Productos",
                    description: "Categorización flexible con atributos personalizados, variantes y relaciones entre productos."
                },
                {
                    icon: "history",
                    title: "Historial de Cambios",
                    description: "Auditoría completa de todas las modificaciones realizadas con opción de revertir cambios."
                },
                {
                    icon: "cell_tower",
                    title: "Torre de Control",
                    description: "Vista panorámica del estado de los productos: completitud, calidad de datos y cobertura."
                }
            ]}
            images={[
                {
                    src: "https://www.tiendapp.co/web/image/1993-1d1c9594/imagen-PIM%20%281%29.svg",
                    alt: "PIM — Administrador de Información de Productos"
                }
            ]}
        />
    );
}
