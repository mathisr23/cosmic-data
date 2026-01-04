"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function GradientOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Animation de la teinte (hue rotation)
    gsap.to(el, {
      filter: "hue-rotate(360deg)",
      duration: 80, // 1min20 par rotation complète
      repeat: -1,
      ease: "none",
    });

    // Animation lente du mouvement du gradient (translation douce)
    gsap.to(el, {
      backgroundPosition: "200% 200%",
      duration: 120, // 2 minutes
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 -z-5 opacity-40 pointer-events-none"
      style={{
        background: `
          radial-gradient(circle at 30% 40%, rgba(0,255,255,0.12), transparent 60%),
          radial-gradient(circle at 70% 60%, rgba(255,0,255,0.1), transparent 60%),
          radial-gradient(circle at 50% 80%, rgba(0,0,255,0.08), transparent 70%)
        `,
        backgroundSize: "200% 200%",
        mixBlendMode: "screen",
        transition: "filter 10s linear",
      }}
    />
  );
}
