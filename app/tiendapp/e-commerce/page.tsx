import type { Metadata } from "next";
import EcommerceContent from "./EcommerceContent";

export const metadata: Metadata = {
    title: "E-commerce B2B - B2C — TiendApp — María Alejandra Tavera",
    description: "Plataforma de e-commerce omnicanal con WhatsApp Commerce, programas de lealtad, billetera virtual y venta conversacional.",
};

export default function EcommercePage() {
    return <EcommerceContent />;
}
