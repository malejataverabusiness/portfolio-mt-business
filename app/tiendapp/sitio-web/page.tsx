import type { Metadata } from "next";
import SitioWebContent from "./SitioWebContent";

export const metadata: Metadata = {
    title: "Sitio Web TiendApp — María Alejandra Tavera",
    description: "Diseño e implementación del sitio web corporativo de TiendApp. Sitio responsivo enfocado en conversión, SEO y comunicación de la plataforma omnicanal.",
};

export default function SitioWebPage() {
    return <SitioWebContent />;
}
