"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { skills } from "@/lib/data";
import type { Skill } from "@/types";

import {
  SiTypescript,
  SiNextdotjs,
  SiJavascript,
  SiExpress,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiDocker,
  SiSupabase,
  SiMysql,
  SiFigma
} from "react-icons/si";

const categories = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "tools", label: "Tools" },
  { key: "language", label: "Languages" },
] as const;

export const skillIcons: Record<string, React.ReactNode> = {
  "HTML":        <SiHtml5       size={20} color="#E34F26" />,
  "CSS":         <SiCss         size={20} color="#1572B6" />,
  "JavaScript":  <SiJavascript  size={20} color="#F7DF1E" />,
  "TypeScript":  <SiTypescript  size={20} color="#3178C6" />,
  "Python":      <SiPython      size={20} color="#3776AB" />,
  "React":       <SiReact       size={20} color="#61DAFB" />,
  "Next.js":     <SiNextdotjs   size={20} color="#ffffff" />,
  "Tailwind CSS":<SiTailwindcss size={20} color="#06B6D4" />,
  "Node.js":     <SiNodedotjs   size={20} color="#339933" />,
  "Express.js":  <SiExpress     size={20} color="#ffffff" />,
  "Supabase":    <SiSupabase    size={20} color="#3ECF8E" />,
  "MySQL":       <SiMysql       size={20} color="#4479A1" />,
  "Docker":      <SiDocker      size={20} color="#2496ED" />,
  "Figma":       <SiFigma       size={20} color="#F24E1E" />,
};

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative border border-white/8 p-5 cursor-default hover:border-white/25 transition-all duration-300 bg-[#0a0a0a] hover:bg-[#0f0f0f]"
    >
      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-4 h-px bg-white/0 group-hover:bg-white/40 transition-all duration-500" />
      <div className="absolute top-0 left-0 w-px h-4 bg-white/0 group-hover:bg-white/40 transition-all duration-500" />

      <div className="flex flex-col gap-4">
        {/* Icon */}
        <div className="w-10 h-10 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all duration-300">
          {skillIcons[skill.name] || <span className="font-mono text-sm text-[#666] group-hover:text-white transition-colors">{skill.name.slice(0, 2)}</span>}
        </div>

        {/* Name */}
        <div>
          <p className="text-sm font-medium text-[#888] group-hover:text-white transition-colors duration-300">
            {skill.name}
          </p>
          <p className="font-mono text-xs text-[#333] capitalize mt-0.5">
            {skill.category}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-px bg-white/5 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-white/40"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.05 + 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <span className="font-mono text-xs text-[#333]">{skill.level}%</span>
      </div>

      {/* Hover glow */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, transparent 70%)",
          }}
        />
      )}
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle
          label="Skills & Technologies"
          title={`My Technical\nArsenal.`}
          subtitle="A curated set of technologies I use to build exceptional digital products."
        />

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`font-mono text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 ${
                activeCategory === cat.key
                  ? "border-white text-white bg-white/5"
                  : "border-white/10 text-[#444] hover:border-white/30 hover:text-[#888]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
