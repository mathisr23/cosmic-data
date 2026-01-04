"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

interface InfoCardProps {
  fact: { id: string; title: string; description: string; category: string };
  onClose: () => void;
}

export default function InfoCard({ fact, onClose }: InfoCardProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    setDisplayText("");
    setIsTyping(true);
    const interval = setInterval(() => {
      setDisplayText(fact.description.slice(0, i));
      i++;
      if (i > fact.description.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [fact.description]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="glass-morphism relative w-full max-w-lg p-8 rounded-lg overflow-hidden border-cyan-400/30"
      >
        {/* --- Scanning Line Effect --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-scanline" />
        </div>

        {/* --- Header / Decorative Brackets --- */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-cyan-400" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-cyan-400" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-cyan-400" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-cyan-400" />

        <div className="mb-6">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[10px] text-cyan-400/60 uppercase tracking-widest">Data Stream // {fact.id}</span>
            <span className="text-[10px] text-pink-500/80 uppercase tracking-widest">{fact.category}</span>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-cyan-400/50 to-transparent" />
        </div>

        <h2 className="text-3xl font-orbitron mb-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.4)] transition-all">
          {fact.title}
        </h2>

        <div className="min-h-[80px] text-left">
          <p className="text-gray-200 leading-relaxed font-mono text-sm tracking-tight inline">
            {displayText}
          </p>
          {isTyping && <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-blink align-middle" />}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="text-[10px] text-gray-500 font-mono">
            [ STATUS: VERIFIED ]<br />
            [ ORIGIN: COSMIC_DB ]
          </div>
          <button
            onClick={onClose}
            className="group relative px-6 py-2 bg-transparent overflow-hidden"
          >
            <div className="absolute inset-0 border border-cyan-400/50 group-hover:border-cyan-400 transition-colors" />
            <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 transition-colors" />
            <span className="relative text-cyan-400 group-hover:text-cyan-300 text-xs font-orbitron tracking-widest uppercase">
              Close Terminal
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
