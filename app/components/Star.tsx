"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface StarProps {
  x: number;
  y: number;
  title: string;
  color: string;
  category: string;
  onClick: () => void;
  onHover: (x: number, y: number) => void;
  onLeave: () => void;
}

export default function Star({ x, y, title, color, category, onClick, onHover, onLeave }: StarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 🌠 Apparition et respiration douce avec variation par catégorie
  useEffect(() => {
    const delay = Math.random() * 2;
    const duration = 3 + Math.random() * 3;

    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)", delay: Math.random() * 1 }
    );

    gsap.to(ref.current, {
      opacity: 0.4 + Math.random() * 0.6,
      scale: () => 0.8 + Math.random() * 0.4,
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay
    });
  }, []);

  // 🪐 Effet Magnétique (Répulsion au survol large)
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !ref.current) return;

      const rect = containerRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;

      // Calcul de la position réelle de l'étoile
      const starX = (x / 100) * rect.width;
      const starY = (y / 100) * rect.height;

      const dx = e.clientX - starX;
      const dy = e.clientY - starY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 200; // Rayon d'influence magnétique

      if (distance < maxDist) {
        const force = (maxDist - distance) / maxDist;
        const moveX = (dx / distance) * -30 * force;
        const moveY = (dy / distance) * -30 * force;

        gsap.to(ref.current, {
          x: moveX,
          y: moveY,
          duration: 0.6,
          ease: "power2.out"
        });
      } else {
        gsap.to(ref.current, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)"
        });
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [x, y]);

  // 🌌 Effet de trail lumineux au clic
  const handleClick = () => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      scale: 2.5,
      opacity: 1,
      boxShadow: `0 0 40px 15px ${color}`,
      duration: 0.3,
      ease: "power4.out",
      yoyo: true,
      repeat: 1,
    });

    const ripple = document.createElement("div");
    ripple.className = "ripple";
    Object.assign(ripple.style, {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: "0px",
      height: "0px",
      borderRadius: "50%",
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
      background: `radial-gradient(circle, ${color}cc 0%, transparent 80%)`,
      zIndex: "30"
    });
    el.appendChild(ripple);

    gsap.to(ripple, {
      width: "200px",
      height: "200px",
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => ripple.remove(),
    });

    onClick();
  };

  return (
    <div
      ref={containerRef}
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div
        ref={ref}
        onClick={handleClick}
        onMouseMove={(e) => onHover(e.clientX, e.clientY)}
        onMouseLeave={onLeave}
        className="star w-3 h-3 rounded-full cursor-pointer z-40 transition-shadow duration-300 hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.8)]"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          boxShadow: `0 0 10px 3px ${color}`,
        }}
      />
    </div>
  );
}
