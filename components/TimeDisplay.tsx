"use client";

import { useEffect, useState } from "react";

export default function TimeDisplay() {
    const [time, setTime] = useState("00:00 AM");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase());
        };

        updateTime(); // Initial call
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return <span className="text-[10px] font-bold tracking-widest text-slate-900">{time}</span>;
}
