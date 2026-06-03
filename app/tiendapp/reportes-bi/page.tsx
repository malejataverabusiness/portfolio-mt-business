import type { Metadata } from "next";
import ReportesBIContent from "./ReportesBIContent";

export const metadata: Metadata = {
    title: "Reportes BI — TiendApp — María Alejandra Tavera",
    description: "Business Intelligence con Power BI, tableros personalizados, repositorios de datos y analítica estratégica para toma de decisiones.",
};

export default function ReportesBIPage() {
    return <ReportesBIContent />;
}
