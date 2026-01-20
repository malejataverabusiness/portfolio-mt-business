"use client";

import { useEffect, useRef } from "react";

export default function TiltPanel({ children, className }: { children: React.ReactNode; className?: string }) {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!panelRef.current) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const moveX = (clientX - innerWidth / 2) / 120;
            const moveY = (clientY - innerHeight / 2) / 120;
            const rotateX = (clientY - innerHeight / 2) / -300;
            const rotateY = (clientX - innerWidth / 2) / 300;

            panelRef.current.style.transform = `perspective(2000px) translate(${moveX}px, ${moveY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <main
            ref={panelRef}
            id="main-panel"
            className={className}
        >
            {children}
        </main>
    );
}
