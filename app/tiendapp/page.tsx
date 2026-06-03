import type { Metadata } from "next";
import TiendAppContent from "./TiendAppContent";

export const metadata: Metadata = {
    title: "TiendApp — María Alejandra Tavera",
    description: "Plataforma omnicanal de automatización comercial con I.A. Diseño UI/UX del sitio web corporativo y 4 productos digitales: Super APP Vendedor, E-commerce B2B-B2C, Reportes BI y PIM.",
};

export default function TiendAppPage() {
    return <TiendAppContent />;
}
