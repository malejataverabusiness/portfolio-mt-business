import type { Metadata } from "next";
import SantuarioContent from "./SantuarioContent";

export const metadata: Metadata = {
    title: "Santuario App — María Alejandra Tavera",
    description: "Santuario es una aplicación de regulación emocional y bienestar mental. Tu espacio para respirar. Diseño UI/UX y desarrollo front-end.",
};

export default function SantuarioPage() {
    return <SantuarioContent />;
}
