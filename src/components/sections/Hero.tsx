"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { personalInfo } from "@/lib/data";

/* ─────────────────────────────────────────────
   Scramble text effect
───────────────────────────────────────────── */
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*".split("");

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const animate = () => {
      let output = "";
      for (let i = 0; i < text.length; i++) {
        output += i < frame / 3 ? text[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      el.textContent = output;
      frame++;
      if (frame <= text.length * 3) {
        requestAnimationFrame(animate);
      } else {
        el.textContent = text;
      }
    };

    timeout = setTimeout(() => requestAnimationFrame(animate), delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span ref={ref}>{text}</span>;
}

/* ─────────────────────────────────────────────
   Lanyard Card — looped strap + plastic ID holder
───────────────────────────────────────────── */
function LanyardCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateRaw = useSpring(0, { stiffness: 100, damping: 20 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const dx = e.clientX - centerX;
    rotateRaw.set((dx / rect.width) * 25);
  };

  const handleMouseLeave = () => {
    rotateRaw.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring", 
        damping: 12, 
        stiffness: 60,
        delay: 0.1 
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
        cursor: isHovered ? "grab" : "default",
      }}
    >
      {/* ── Looped lanyard strap (V-shape) ── */}
      <div
        style={{
          transformOrigin: "top",
          position: "relative",
          width: "220px",
          height: "260px", // Reduced from 460px to pull the card higher up on screen
          flexShrink: 0,
          zIndex: 1,
        }}
      >
        {/* Right strap arm (goes behind left) */}
        <div style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          width: "32px",
          height: "800px", // Go off-screen
          transformOrigin: "bottom left",
          transform: "rotate(14deg)",
          background: "linear-gradient(90deg, #0a0a0a 0%, #1a1a1a 30%, #262626 60%, #0f0f0f 100%)",
          borderRadius: "4px",
          boxShadow: "inset 2px 0 4px rgba(255,255,255,0.06), inset -2px 0 4px rgba(0,0,0,0.6)",
          overflow: "hidden",
          zIndex: 1,
        }}>
          {Array.from({ length: 55 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              top: `${i * 15}px`,
              left: 0, right: 0,
              height: "1.5px",
              background: i % 2 === 0 ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.4)",
            }} />
          ))}
          <div style={{
            position: "absolute",
            top: 0, bottom: 0,
            left: "60%", width: "4px",
            background: "rgba(255,255,255,0.05)",
          }} />
        </div>

        {/* Left strap arm (overlaps right at the bottom) */}
        <div style={{
          position: "absolute",
          right: "50%",
          bottom: 0,
          width: "32px",
          height: "800px",
          transformOrigin: "bottom right",
          transform: "rotate(-14deg)",
          background: "linear-gradient(90deg, #0f0f0f 0%, #262626 40%, #1a1a1a 70%, #0a0a0a 100%)",
          borderRadius: "4px",
          boxShadow: "inset 2px 0 4px rgba(255,255,255,0.06), inset -2px 0 4px rgba(0,0,0,0.6), 5px 0 10px rgba(0,0,0,0.6)", // drop shadow
          overflow: "hidden",
          zIndex: 2,
        }}>
          {Array.from({ length: 55 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              top: `${i * 15}px`,
              left: 0, right: 0,
              height: "1.5px",
              background: i % 2 === 0 ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.4)",
            }} />
          ))}
          <div style={{
            position: "absolute",
            top: 0, bottom: 0,
            left: "35%", width: "4px",
            background: "rgba(255,255,255,0.05)",
          }} />
        </div>
      </div>

      {/* ── Metal swivel clip ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "-14px", // seamless connection to strap
          zIndex: 3,
          position: "relative",
        }}
      >
        {/* Clip top loop (holds the strap) */}
        <div style={{
          width: "78px",
          height: "22px",
          background: "linear-gradient(180deg, #555 0%, #333 100%)",
          borderRadius: "8px 8px 0 0",
          boxShadow: "inset 0 2px 2px rgba(255,255,255,0.3), 0 2px 6px rgba(0,0,0,0.6)",
          position: "relative",
        }} />
        
        {/* Clip upper rectangle */}
        <div style={{
          width: "26px",
          height: "40px",
          background: "linear-gradient(180deg, #686868 0%, #444 45%, #2c2c2c 100%)",
          borderRadius: "2px",
          boxShadow: "inset 1px 0 0 rgba(255,255,255,0.3), inset -1px 0 0 rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.8)",
          position: "relative",
          marginTop: "-2px",
          overflow: "hidden",
        }}>
          {/* Rivet hole */}
          <div style={{
            position: "absolute",
            top: "10px", left: "50%",
            transform: "translateX(-50%)",
            width: "10px", height: "14px",
            border: "1.5px solid rgba(255,255,255,0.2)",
            borderRadius: "2px",
          }} />
          {/* Sheen */}
          <div style={{
            position: "absolute",
            top: 0, left: "20%",
            width: "6px", bottom: 0,
            background: "rgba(255,255,255,0.08)",
          }} />
        </div>

        {/* Swivel dome */}
        <div style={{
          width: "36px",
          height: "18px",
          background: "linear-gradient(180deg, #565656 0%, #303030 55%, #1a1a1a 100%)",
          borderRadius: "0 0 18px 18px",
          boxShadow: "inset 0 -3px 6px rgba(0,0,0,0.7), 0 3px 8px rgba(0,0,0,0.7)",
        }} />

        {/* Connector pin */}
        <div style={{
          width: "14px",
          height: "22px",
          background: "linear-gradient(180deg, #484848, #252525)",
          boxShadow: "inset 1px 0 0 rgba(255,255,255,0.12), inset -1px 0 0 rgba(0,0,0,0.4)",
        }} />
      </div>

      {/* ── Card with pendulum swing ── */}
      <div
        style={{ transformOrigin: "top center", zIndex: 4 }}
      >
        <motion.div
          style={{ rotate: rotateRaw, transformOrigin: "top center" }}
          initial={{ rotate: -15 }}
          animate={isHovered ? {} : { rotate: [-12, 12] }}
          transition={isHovered ? {} : {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: [0.45, 0.05, 0.55, 0.95],
          }}
        >
          {/* ── Dark rigid plastic ID card holder ── */}
          <div style={{
            width: "300px",
            background: "linear-gradient(160deg, rgba(26,26,30,0.98) 0%, rgba(14,14,17,1) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            boxShadow: `
              0 30px 60px rgba(0,0,0,0.9),
              0 10px 24px rgba(0,0,0,0.7),
              inset 0 1px 0 rgba(255,255,255,0.08),
              inset 0 -1px 0 rgba(0,0,0,0.5)
            `,
            position: "relative",
            overflow: "hidden",
            marginTop: "-12px", // attach securely to pin
          }}>
            {/* Plastic gloss sheen */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(140deg, rgba(255,255,255,0.06) 0%, transparent 48%)",
              pointerEvents: "none",
              zIndex: 4,
            }} />

            {/* Plastic Reinforcement for the Hole (Penyangga) */}
            <div style={{
              position: "absolute",
              top: "10px", left: "50%",
              transform: "translateX(-50%)",
              width: "60px", height: "20px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              zIndex: 4,
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.2)",
            }} />

            {/* Clip hole at top */}
            <div style={{
              position: "absolute",
              top: "14px", left: "50%",
              transform: "translateX(-50%)",
              width: "40px", height: "12px",
              borderRadius: "6px",
              background: "#050505",
              border: "1px solid rgba(255,255,255,0.05)",
              zIndex: 5,
              boxShadow: "inset 0 2px 5px rgba(0,0,0,1)",
            }} />

            {/* Front Hook overlap (makes it look like it clips through) */}
            <div style={{
              position: "absolute",
              top: "-2px", left: "50%",
              transform: "translateX(-50%)",
              width: "14px", height: "20px",
              background: "linear-gradient(180deg, #3a3a3a, #1a1a1a)",
              borderRadius: "0 0 7px 7px",
              boxShadow: "inset 1px 0 0 rgba(255,255,255,0.2), inset -1px 0 0 rgba(0,0,0,0.3), 0 4px 6px rgba(0,0,0,0.8)",
              zIndex: 6,
            }} />

            {/* Corner screws (decorative) */}
            {[
              { top: "8px", left: "8px" },
              { top: "8px", right: "8px" },
              { bottom: "8px", left: "8px" },
              { bottom: "8px", right: "8px" },
            ].map((pos, i) => (
              <div key={i} style={{
                position: "absolute",
                ...pos,
                width: "8px", height: "8px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3a3a3a, #1a1a1a)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                zIndex: 3,
                boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
              }} />
            ))}

            {/* Inner content */}
            <div style={{ padding: "50px 25px 25px", position: "relative", zIndex: 2 }}>

              {/* Portrait profile photo */}
              <div style={{
                width: "250px",
                height: "340px",
                borderRadius: "8px",
                margin: "0 auto 20px",
                position: "relative",
                overflow: "hidden",
                border: "2px solid rgba(255,255,255,0.12)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
              }}>
                <Image
                  src="/profil.jpeg"
                  alt={personalInfo.name}
                  fill
                  sizes="250px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                    filter: "contrast(1.02) brightness(0.92)",
                  }}
                  priority
                />
              </div>

              {/* Thin separator line */}
              <div style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                marginBottom: "18px",
              }} />

              {/* Name */}
              <p style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#f0f0f0",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textAlign: "center",
                margin: "0 0 8px",
              }}>
                {personalInfo.name}
              </p>

              {/* Job title */}
              <p style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textAlign: "center",
                margin: "0",
                lineHeight: "1.4",
              }}>
                Frontend Developer<br />&amp; UI/UX Designer
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}


/* ─────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────── */
export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const techStack = ["Typescript", "React.js", "Tailwind CSS", "Next.js"];

  return (
    <section className="relative min-h-screen flex items-center" style={{ overflow: "visible" }}>
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern pointer-events-none z-0" />

      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 25% 50%, rgba(255,255,255,0.025) 0%, transparent 70%)",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 min-h-screen py-24" style={{ alignItems: undefined }}>

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-7 flex-1" style={{ maxWidth: "520px" }}>

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-6 h-px bg-white/40" />
              <span className="font-mono text-xs tracking-[0.28em] text-[#555] uppercase">
                Available for work
              </span>
            </motion.div>

            {/* Main heading — overflow visible so nothing clips */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "visible" }}
            >
              <h1
                style={{
                  fontSize: "clamp(2.6rem, 6vw, 5.5rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  margin: 0,
                  paddingBottom: "0.05em",
                }}
              >
                <span style={{ color: "#fff", display: "block" }}>
                  <ScrambleText text="Frontend" delay={0.5} />
                </span>
                <span className="text-gradient" style={{ display: "block" }}>
                  <ScrambleText text="Developer" delay={0.9} />
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}
            >
              &amp; UI/UX Designer —{" "}
              <span style={{ color: "rgba(255,255,255,0.18)" }}>{personalInfo.name}</span>
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", lineHeight: 1.85 }}
            >
              {personalInfo.tagline}
            </motion.p>

            {/* Tech pills */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="flex flex-wrap gap-2"
            >
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-sm border border-white/10 px-4 py-2 text-[#666] tracking-wide hover:border-white/25 hover:text-[#999] transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Bottom links */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.88 }}
              className="flex flex-col gap-2 pt-2"
            >
              <Link
                href="#projects"
                className="font-mono text-sm text-[#444] hover:text-[#888] transition-colors duration-300 flex items-center gap-2"
              >
                <span>↓</span> explore my work below
              </Link>
              <Link
                href="#contact"
                className="font-mono text-sm text-[#444] hover:text-[#888] transition-colors duration-300 flex items-center gap-2"
              >
                <span>✓</span> open to full-time &amp; freelance opportunities
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT: Lanyard card — hangs from top bar ── */}
          <div
            className="hidden lg:flex justify-center flex-shrink-0"
            style={{
              alignSelf: "flex-start",
              marginTop: "-96px",     /* pull up behind navbar */
              paddingTop: "0",
            }}
          >
            <LanyardCard />
          </div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10"
      >
        <div className="w-10 h-px bg-white/10" />
        <span className="font-mono text-[10px] text-[#2e2e2e] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-10 h-px bg-white/10" />
      </motion.div>
    </section>
  );
}
