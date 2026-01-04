"use client";
import { useState } from "react";
import GalaxyBackground from "./components/GalaxyBackground";
import GradientOverlay from "./components/GradientOverlay";
import StarField from "./components/StarField";
import IntroScreen from "./components/IntroScreen";
import HUD from "./components/HUD";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <main className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {/* --- Intro --- */}
        {!introDone ? (
          <IntroScreen key="intro" onFinish={() => setIntroDone(true)} />
        ) : (
          /* --- Contenu principal --- */
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <HUD activeCategory={activeCategory} onSetCategory={setActiveCategory} />
            <div className="absolute inset-0 z-0">
              <GalaxyBackground />
            </div>

            <GradientOverlay />

            {/* Texte principal */}
            <div className="absolute top-10 text-center text-cyan-300 z-10 flex flex-col items-center">
              <div className="flex items-center gap-3 mb-2">
                <motion.svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 14a5 5 0 1 1 5-5 5 5 0 0 1-5 5Z" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  <path d="M12 7v1M12 16v1M7 12h1M16 12h1" strokeLinecap="round" />
                </motion.svg>
                <h1 className="text-4xl font-orbitron tracking-tighter uppercase">Cosmic Data</h1>
              </div>
              <p className="text-[10px] text-cyan-500/60 uppercase tracking-[0.3em]">
                {activeCategory ? `Exploring Sector: ${activeCategory}` : "Protocol: Global Knowledge Discovery"}
              </p>
            </div>

            <StarField activeCategory={activeCategory} />

            {/* --- Signature / Légende façon terminal --- */}
            <div className="absolute bottom-4 left-6 text-xs text-cyan-400/70 font-orbitron tracking-widest z-20 select-none pointer-events-none flex items-center">
              <span className="opacity-80">crafted by&nbsp;</span>
              <span className="glow-text text-cyan-300">mathis rivière</span>
              <span className="opacity-50">&nbsp;· cosmic data 2025</span>

              {/* Curseur qui clignote */}
              <motion.span
                className="ml-1 text-cyan-300 opacity-80"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                _
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
