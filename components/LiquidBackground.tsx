"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function LiquidBackground() {
    const time = useMotionValue(0);

    useEffect(() => {
        let animationFrame: number;
        const update = () => {
            // Idle speed: increased to make it clearly visible
            time.set(time.get() + 2.5);
            animationFrame = requestAnimationFrame(update);
        };
        update();
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Scroll speed
            time.set(time.get() + e.deltaY * 3);
        };

        window.addEventListener("wheel", handleWheel);
        return () => window.removeEventListener("wheel", handleWheel);
    }, []);

    // Amplitudes
    const y1 = useTransform(time, (t) => Math.sin(t * 0.002) * 300);
    const x1 = useTransform(time, (t) => Math.cos(t * 0.003) * 300);

    const y2 = useTransform(time, (t) => Math.sin(t * 0.0025 + 2) * 350);
    const x2 = useTransform(time, (t) => Math.cos(t * 0.0015 + 1) * 350);

    const y3 = useTransform(time, (t) => Math.sin(t * 0.001 + 4) * 250);
    const x3 = useTransform(time, (t) => Math.cos(t * 0.002 + 3) * 250);

    const y4 = useTransform(time, (t) => Math.sin(t * 0.003 + 5) * 320);
    const x4 = useTransform(time, (t) => Math.cos(t * 0.0025 + 2) * 320);

    // Rotation
    const r1 = useTransform(time, (t) => Math.sin(t * 0.001) * 180);
    const r2 = useTransform(time, (t) => Math.cos(t * 0.0015) * 180);

    // Adjusted scale pulsing to be more noticeable
    const s1 = useTransform(time, (t) => 1 + Math.sin(t * 0.002) * 0.3); // Faster pulse
    const s2 = useTransform(time, (t) => 1 + Math.cos(t * 0.0025) * 0.3); // Faster pulse

    return (
        <div className="liquid-environment">
            <motion.div
                className="blob blob-1"
                style={{ x: x1, y: y1, rotate: r1, scale: s1 }}
            />
            <motion.div
                className="blob blob-2"
                style={{ x: x2, y: y2, rotate: r2, scale: s2 }}
            />
            <motion.div
                className="blob blob-3"
                style={{ x: x3, y: y3, rotate: r1, scale: s1 }}
            />
            <motion.div
                className="blob blob-4"
                style={{ x: x4, y: y4, rotate: r2, scale: s2 }}
            />
        </div>
    );
}
