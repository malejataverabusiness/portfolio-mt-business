import type { Metadata } from "next";
import SuperAppContent from "./SuperAppContent";

export const metadata: Metadata = {
    title: "Super APP Vendedor — TiendApp — María Alejandra Tavera",
    description: "App móvil potenciada por I.A. para equipos comerciales. Recomendaciones inteligentes, GPS, modo offline y torre de control para supervisores.",
};

export default function SuperAppPage() {
    return <SuperAppContent />;
}
