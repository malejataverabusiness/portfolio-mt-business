import type { Metadata } from "next";
import PIMContent from "./PIMContent";

export const metadata: Metadata = {
    title: "PIM — TiendApp — María Alejandra Tavera",
    description: "Administrador centralizado de información de productos con control de usuarios, sincronización multicanal y torre de control.",
};

export default function PIMPage() {
    return <PIMContent />;
}
