"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

export default function IntroScreen({ onFinish }: { onFinish: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Durée totale de l’intro : ~4.2s
    const timer = setTimeout(() => {
      // ⚡ timeline plus fluide : flash bleu + fade progressif
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(".intro-overlay", {
            opacity: 0,
            duration: 1.2, // slightly faster fade to let the next screen take over
            ease: "power2.inOut",
            onComplete: () => {
              setShow(false);
              onFinish();
            },
          });
        },
      });

      // 💙 Flash spatial doux (cyan/bleu)
      tl.fromTo(
        ".intro-flash",
        { opacity: 0 },
        {
          opacity: 0.6, // moins violent
          duration: 0.4,
          ease: "power1.inOut",
        }
      ).to(".intro-flash", {
        opacity: 0,
        duration: 1.4,
        ease: "sine.out",
      });
    }, 2800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* --- Écran d’intro --- */}
          <motion.div
            className="intro-overlay fixed inset-0 flex flex-col items-center justify-center bg-black text-cyan-400 font-orbitron z-[998]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h1
              className="text-4xl mb-4 tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              Entering Cosmic Data...
            </motion.h1>

            <motion.div
              className="h-1 w-48 bg-cyan-600 rounded-full overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
              style={{ transformOrigin: "left center" }}
            />

            <motion.p
              className="text-xs mt-6 text-gray-400 tracking-[0.2em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              [ SYSTEM BOOT SEQUENCE INITIALIZED ]
            </motion.p>
          </motion.div>

          {/* --- Flash spatial bleu --- */}
          <div
            className="intro-flash fixed inset-0 pointer-events-none z-[999]"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,255,255,0.4) 0%, rgba(0,100,255,0.1) 40%, transparent 80%)",
              opacity: 0,
              mixBlendMode: "screen",
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
