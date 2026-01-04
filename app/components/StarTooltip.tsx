"use client";
import { motion, AnimatePresence } from "framer-motion";

interface StarTooltipProps {
  text: string;
  x: number;
  y: number;
  visible: boolean;
}

export default function StarTooltip({ text, x, y, visible }: StarTooltipProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed pointer-events-none z-50 px-3 py-1 rounded-xl text-[0.75rem] text-white bg-cyan-600/30 border border-cyan-400/40 backdrop-blur-sm shadow-[0_0_10px_#00ffff55]"
          style={{
            left: x + 12,
            top: y + 12,
            transform: "translate(-50%, -100%)",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
