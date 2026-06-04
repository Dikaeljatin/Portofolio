"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { techOrbits } from "@/lib/data";
import type { TechOrbit } from "@/types";
import { skillIcons } from "./Skills";

interface PlanetState {
  x: number;
  y: number;
  name: string;
  description: string;
  orbitRadius: number;
  speed: number;
  size: number;
  angle: number;
  icon: React.ReactNode;
}

export default function TechGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const planetsContainerRef = useRef<HTMLDivElement>(null);
  const planetDOMRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animRef = useRef<number>(0);
  const planetsRef = useRef<PlanetState[]>([]);
  const pausedPlanetsRef = useRef<Set<string>>(new Set());
  const [hoveredTech, setHoveredTech] = useState<TechOrbit | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 50, y: 50 });

  const orbitConfig = {
    1: { radius: 90, speed: 0.4, size: 28 },
    2: { radius: 160, speed: 0.25, size: 24 },
    3: { radius: 235, speed: 0.15, size: 20 },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Init planet states
    planetsRef.current = techOrbits.map((tech) => {
      const cfg = orbitConfig[tech.orbit as keyof typeof orbitConfig];
      const techsInOrbit = techOrbits.filter((t) => t.orbit === tech.orbit);
      const idxInOrbit = techsInOrbit.indexOf(tech);
      const totalInOrbit = techsInOrbit.length;
      const startAngle = (idxInOrbit / totalInOrbit) * Math.PI * 2;

      return {
        x: 0,
        y: 0,
        name: tech.name,
        description: tech.description,
        orbitRadius: cfg.radius,
        speed: cfg.speed,
        size: cfg.size,
        angle: startAngle,
        icon: skillIcons[tech.name] || tech.name.slice(0, 2),
      };
    });

    let centerX = 0;
    let centerY = 0;
    let stars: { x: number; y: number; size: number; opacity: number; twinkle: number }[] = [];

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;

      // Generate stars
      stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        opacity: Math.random() * 0.4 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        const twinkledOpacity = star.opacity * (0.7 + 0.3 * Math.sin(star.twinkle + time * 0.02));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${twinkledOpacity})`;
        ctx.fill();
      });

      // Draw orbit rings
      [90, 160, 235].forEach((r) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw center
      const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 45);
      centerGlow.addColorStop(0, "rgba(255,255,255,0.12)");
      centerGlow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 45, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 32, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "bold 9px 'DM Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("MY", centerX, centerY - 7);
      ctx.fillText("STACK", centerX, centerY + 7);

      // Update planets logic and DOM nodes
      planetsRef.current.forEach((planet, i) => {
        const tech = techOrbits[i];
        if (!pausedPlanetsRef.current.has(tech.name)) {
          planet.angle += (planet.speed * 0.005);
        }

        planet.x = centerX + planet.orbitRadius * Math.cos(planet.angle);
        planet.y = centerY + planet.orbitRadius * Math.sin(planet.angle);

        const isPaused = pausedPlanetsRef.current.has(tech.name);

        // Planet glow
        if (isPaused) {
          const glow = ctx.createRadialGradient(planet.x, planet.y, 0, planet.x, planet.y, planet.size + 12);
          glow.addColorStop(0, "rgba(255,255,255,0.15)");
          glow.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(planet.x, planet.y, planet.size + 12, 0, Math.PI * 2);
          ctx.fill();
        }

        // Planet circle
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.size / 2 + 4, 0, Math.PI * 2); // Slightly larger background circle
        ctx.strokeStyle = isPaused ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = isPaused ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)";
        ctx.fill();

        // Update DOM node position
        const domNode = planetDOMRefs.current[i];
        if (domNode) {
          domNode.style.transform = `translate(${planet.x}px, ${planet.y}px) translate(-50%, -50%)`;
          domNode.style.opacity = isPaused ? "1" : "0.7";
        }
      });

      time++;
      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let found = false;
    for (let i = 0; i < planetsRef.current.length; i++) {
      const planet = planetsRef.current[i];
      const dist = Math.hypot(mouseX - planet.x, mouseY - planet.y);
      if (dist < planet.size / 2 + 10) {
        const tech = techOrbits[i];
        pausedPlanetsRef.current = new Set([tech.name]);
        setHoveredTech(tech);
        setTooltipPos({
          x: (planet.x / (containerRef.current?.clientWidth || 1)) * 100,
          y: (planet.y / (containerRef.current?.clientHeight || 1)) * 100,
        });
        found = true;
        break;
      }
    }

    if (!found) {
      pausedPlanetsRef.current = new Set();
      setHoveredTech(null);
    }
  };

  return (
    <section id="tech-galaxy" className="section-padding relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle
          label="Tech Ecosystem"
          title={`The technologies that\npower my universe`}
          subtitle="An orbital visualization of the technologies that power my work. Hover over any planet to explore."
        />

        <div
          ref={containerRef}
          className="relative w-full border border-white/8 overflow-hidden cursor-crosshair h-[400px] md:h-[600px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            pausedPlanetsRef.current = new Set();
            setHoveredTech(null);
          }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          
          {/* Planet DOM Overlays */}
          <div ref={planetsContainerRef} className="absolute inset-0 w-full h-full pointer-events-none">
            {techOrbits.map((tech, i) => (
              <div
                key={tech.name}
                ref={(el) => {
                  planetDOMRefs.current[i] = el;
                }}
                className="absolute left-0 top-0 flex items-center justify-center transition-opacity duration-300"
                style={{ width: "24px", height: "24px" }}
              >
                {/* Custom size for the SVG icons */}
                <div className="flex items-center justify-center w-full h-full [&>svg]:w-[18px] [&>svg]:h-[18px]">
                  {skillIcons[tech.name] || <span className="font-mono text-[10px] text-white">{tech.name.slice(0, 2)}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredTech && (
              <div
                className="absolute z-20 pointer-events-none"
                style={{
                  left: `${tooltipPos.x}%`,
                  top: `${tooltipPos.y}%`,
                  transform: "translate(-50%, calc(-100% - 20px))",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#111] border border-white/20 p-4 w-52 shadow-2xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl text-white">
                      {skillIcons[hoveredTech.name] || hoveredTech.icon}
                    </span>
                    <span className="text-sm font-bold text-white">{hoveredTech.name}</span>
                  </div>
                  <p className="font-mono text-xs text-[#666] leading-relaxed">
                    {hoveredTech.description}
                  </p>
                  <div className="mt-2 pt-2 border-t border-white/8">
                    <span className="font-mono text-xs text-[#333] uppercase tracking-widest">
                      Orbit {hoveredTech.orbit}
                    </span>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
            <div className="w-1.5 h-1.5 bg-white/20 animate-pulse" />
            <span className="font-mono text-xs text-[#333]">TECH_GALAXY.vis</span>
          </div>
          <div className="absolute bottom-4 right-4 pointer-events-none">
            <span className="font-mono text-xs text-[#222]">
              {techOrbits.length} technologies — 3 orbits
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
