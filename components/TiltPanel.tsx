"use client";

import { useEffect, useRef, useCallback } from "react";

export default function TiltPanel({ children, className }: { children: React.ReactNode; className?: string }) {
    const panelRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        // Throttle to one update per animation frame
        if (rafRef.current !== null) return;

        rafRef.current = requestAnimationFrame(() => {
            if (!panelRef.current) {
                rafRef.current = null;
                return;
            }

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const moveX = (clientX - innerWidth / 2) / 120;
            const moveY = (clientY - innerHeight / 2) / 120;
            const rotateX = (clientY - innerHeight / 2) / -300;
            const rotateY = (clientX - innerWidth / 2) / 300;

            panelRef.current.style.transform = `perspective(2000px) translate(${moveX}px, ${moveY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            rafRef.current = null;
        });
    }, []);

    useEffect(() => {
        // Skip tilt effect on touch devices (no hover, wastes cycles)
        if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        document.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [handleMouseMove]);

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
