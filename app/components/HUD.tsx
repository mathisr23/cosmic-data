"use client";
import { motion } from "framer-motion";

interface HUDProps {
    activeCategory: string | null;
    onSetCategory: (cat: string | null) => void;
}

export default function HUD({ activeCategory, onSetCategory }: HUDProps) {
    const categories = ["Science", "Histoire", "Insolite"];

    return (
        <div className="fixed inset-0 pointer-events-none z-30 font-orbitron text-[10px] text-cyan-500/40 uppercase tracking-[0.2em] select-none">
            {/* --- Coins --- */}
            <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-cyan-500/30" />
            <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-cyan-500/30" />
            <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-cyan-500/30" />
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-cyan-500/30" />

            {/* --- Scanner Line --- */}
            <motion.div
                className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/10"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* --- Category Filters --- */}
            <div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto">
                <div className="text-[8px] opacity-40 mb-2">Filters</div>
                <button
                    onClick={() => onSetCategory(null)}
                    className={`text-left transition-all hover:text-cyan-300 ${!activeCategory ? "text-cyan-300 scale-110 pl-2 border-l border-cyan-300" : ""}`}
                >
                    All sectors
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onSetCategory(cat)}
                        className={`text-left transition-all hover:text-cyan-300 ${activeCategory === cat ? "text-cyan-300 scale-110 pl-2 border-l border-cyan-300" : ""}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* --- Data Readouts --- */}
            <div className="absolute top-10 left-12 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-cyan-500 animate-pulse" />
                    <span>Sector: 7G-Alpha</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-cyan-500 animate-pulse delay-75" />
                    <span>Status: Scanning...</span>
                </div>
            </div>

            <div className="absolute bottom-10 right-12 text-right">
                <div>Syncing Matrix: 98.42%</div>
                <div className="text-[8px] opacity-70">Protocol v.4.0.2</div>
            </div>

            {/* --- Crosshair Central (très discret) --- */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
                <div className="w-8 h-[1px] bg-cyan-400 absolute left-1/2 -translate-x-1/2" />
                <div className="h-8 w-[1px] bg-cyan-400 absolute top-1/2 -translate-y-1/2" />
            </div>
        </div>
    );
}
