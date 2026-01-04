"use client";
import { useEffect, useState } from "react";
import Star from "./Star";
import { facts } from "../data/facts";
import InfoCard from "./InfoCard";
import StarTooltip from "./StarTooltip";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

interface StarData {
  id: string;
  x: number;
  y: number;
  depth: number;
}

interface StarFieldProps {
  activeCategory: string | null;
}

export default function StarField({ activeCategory }: StarFieldProps) {
  const colors = ["#00ffff", "#ff00ff", "#ffd700"];
  const [stars, setStars] = useState<StarData[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState({ text: "", x: 0, y: 0, visible: false });

  // 🌠 Génération des étoiles
  useEffect(() => {
    const positions = facts.map((f) => ({
      id: f.id,
      x: Math.random() * 90,
      y: Math.random() * 90,
      depth: 0.5 + Math.random() * 1.5,
    }));
    setStars(positions);
  }, []);

  const filteredStars = activeCategory
    ? stars.filter(s => facts.find(f => f.id === s.id)?.category === activeCategory)
    : stars;

  // ... (rest of effects remain same)

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        {filteredStars.map((s, i) => {
          const fact = facts.find((f) => f.id === s.id)!;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Star
                x={s.x}
                y={s.y}
                title={fact.title}
                category={fact.category}
                color={colors[i % colors.length]}
                onClick={() => setSelected(fact.id)}
                onHover={(x, y) => setTooltip({ text: fact.title, x, y, visible: true })}
                onLeave={() => setTooltip((prev) => ({ ...prev, visible: false }))}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      <StarTooltip text={tooltip.text} x={tooltip.x} y={tooltip.y} visible={tooltip.visible} />

      <AnimatePresence>
        {selected && (
          <InfoCard fact={facts.find((f) => f.id === selected)!} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
