"use client";
import { useEffect, useRef } from "react";

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Génération de 500 à 800 étoiles
    const stars = Array.from({ length: 800 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2,
      alpha: 0.3 + Math.random() * 0.7,
    }));

    // Nébulosités dynamiques
    const nebulae = [
      { x: w * 0.2, y: h * 0.3, r: h * 0.8, color: "rgba(0, 255, 255, 0.04)", vx: 0.2, vy: 0.1 },
      { x: w * 0.7, y: h * 0.6, r: h * 0.7, color: "rgba(138, 43, 226, 0.04)", vx: -0.15, vy: 0.1 },
      { x: w * 0.5, y: h * 0.4, r: h * 0.9, color: "rgba(75, 0, 130, 0.03)", vx: 0.1, vy: -0.1 },
    ];

    const draw = () => {
      // Fond de base
      const gradient = ctx.createRadialGradient(w / 2, h / 2, h / 4, w / 2, h / 2, h);
      gradient.addColorStop(0, "#05081a");
      gradient.addColorStop(1, "#000000");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Dessin des nébuleuses avec mouvement lent
      nebulae.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        g.addColorStop(0, n.color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.globalCompositeOperation = "screen";
        ctx.fillRect(0, 0, w, h);
      });
      ctx.globalCompositeOperation = "source-over";

      // Étoiles
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
