"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function LiquidBackground() {
    const time = useMotionValue(0);

    useEffect(() => {
        let animationFrame: number;
        const update = () => {
            // Idle speed: visible and organic flow
            time.set(time.get() + 1.0);
            animationFrame = requestAnimationFrame(update);
        };
        update();
        return () => cancelAnimationFrame(animationFrame);
    }, [time]);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Scroll speed: increased slightly per request
            time.set(time.get() + e.deltaY * 0.9);
        };

        window.addEventListener("wheel", handleWheel);
        return () => window.removeEventListener("wheel", handleWheel);
    }, [time]);

    // Amplitudes for large blobs
    const y1 = useTransform(time, (t) => Math.sin(t * 0.002) * 300);
    const x1 = useTransform(time, (t) => Math.cos(t * 0.003) * 300);

    const y2 = useTransform(time, (t) => Math.sin(t * 0.0025 + 2) * 350);
    const x2 = useTransform(time, (t) => Math.cos(t * 0.0015 + 1) * 350);

    const y3 = useTransform(time, (t) => Math.sin(t * 0.001 + 4) * 250);
    const x3 = useTransform(time, (t) => Math.cos(t * 0.002 + 3) * 250);

    const y4 = useTransform(time, (t) => Math.sin(t * 0.003 + 5) * 320);
    const x4 = useTransform(time, (t) => Math.cos(t * 0.0025 + 2) * 320);

    // Amplitudes for small pink dots (faster and wider range)
    const dy1 = useTransform(time, (t) => Math.sin(t * 0.004) * 400);
    const dx1 = useTransform(time, (t) => Math.cos(t * 0.005) * 500);

    const dy2 = useTransform(time, (t) => Math.cos(t * 0.003 + 2) * 600);
    const dx2 = useTransform(time, (t) => Math.sin(t * 0.004 + 1) * 400);

    const dy3 = useTransform(time, (t) => Math.sin(t * 0.005 + 4) * 300);
    const dx3 = useTransform(time, (t) => Math.cos(t * 0.006 + 3) * 700);

    // Rotation
    const r1 = useTransform(time, (t) => Math.sin(t * 0.001) * 180);
    const r2 = useTransform(time, (t) => Math.cos(t * 0.0015) * 180);

    // Adjusted scale pulsing to be more noticeable
    const s1 = useTransform(time, (t) => 1 + Math.sin(t * 0.002) * 0.3); // Faster pulse
    const s2 = useTransform(time, (t) => 1 + Math.cos(t * 0.0025) * 0.3); // Faster pulse

    // Scale for dots
    const sd1 = useTransform(time, (t) => 1 + Math.sin(t * 0.008) * 0.5);

    return (
        <div className="liquid-environment">
            {/* Large background blobs */}
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

            {/* Small floating pink dots */}
            <motion.div
                className="absolute w-12 h-12 rounded-full bg-petite-orchid/30 blur-md"
                style={{ top: '20%', left: '30%', x: dx1, y: dy1, scale: sd1 }}
            />
            <motion.div
                className="absolute w-8 h-8 rounded-full bg-petite-orchid/40 blur-sm"
                style={{ top: '60%', left: '70%', x: dx2, y: dy2, scale: sd1 }}
            />
            <motion.div
                className="absolute w-16 h-16 rounded-full bg-petite-orchid/20 blur-lg"
                style={{ top: '80%', left: '10%', x: dx3, y: dy3, scale: s2 }}
            />
        </div>
    );
}
