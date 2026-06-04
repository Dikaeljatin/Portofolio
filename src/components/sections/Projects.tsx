"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import SectionTitle from "@/components/ui/SectionTitle";
import { projects } from "@/lib/data";
import type { Project } from "@/types";

const categories = ["All", "Web", "Fullstack", "Mobile", "Other"] as const;
type Category = (typeof categories)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative border border-white/8 bg-[#0a0a0a] overflow-hidden hover:border-white/20 transition-all duration-500"
    >
      {/* Thumbnail area */}
      <div className="relative h-44 bg-[#0e0e0e] overflow-hidden border-b border-white/5">
        {/* Grid pattern as placeholder */}
        <div className="absolute inset-0 grid-pattern opacity-50" />

        {/* Project number */}
        <div className="absolute top-4 left-4">
          <span className="font-mono text-xs text-[#2a2a2a]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 right-4">
          <span className="font-mono text-xs border border-white/10 px-2 py-1 text-[#444] uppercase tracking-widest">
            {project.category}
          </span>
        </div>

        {/* Project title overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-bold text-white/5 tracking-tighter select-none">
            {project.title.split(" ")[0]}
          </span>
        </div>

        {/* Hover overlay with links */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="hidden lg:flex absolute inset-0 bg-black/60 backdrop-blur-sm items-center justify-center gap-4"
        >
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              className="font-mono text-xs border border-white/30 px-4 py-2 text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              GitHub ↗
            </Link>
          )}
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              className="font-mono text-xs bg-white text-black px-4 py-2 hover:bg-transparent hover:text-white border border-white transition-all duration-300"
            >
              Live Demo ↗
            </Link>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-white group-hover:text-white transition-colors leading-snug">
            {project.title}
          </h3>
          {project.featured && (
            <span className="flex-shrink-0 font-mono text-xs text-[#444] tracking-widest">
              ★ Featured
            </span>
          )}
        </div>

        <p className="text-sm text-[#555] leading-relaxed mb-4">{project.description}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs border border-white/8 px-2 py-0.5 text-[#444]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="font-mono text-xs text-[#333] px-2 py-0.5">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Mobile Links */}
        <div className="flex lg:hidden items-center gap-4 mt-5 pt-4 border-t border-white/5">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              className="flex items-center gap-1.5 font-mono text-xs text-[#888] hover:text-white transition-colors"
            >
              <SiGithub size={14} />
              GitHub
            </Link>
          )}
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              className="flex items-center gap-1.5 font-mono text-xs text-[#888] hover:text-white transition-colors"
            >
              <FiExternalLink size={14} />
              Live Demo
            </Link>
          )}
        </div>
      </div>

      {/* Bottom line on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-white/30 origin-left"
      />
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <section id="projects" className="section-padding relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle
          label="Selected Work"
          title={`Projects that\nspeak for\nthemselves.`}
          subtitle="A selection of projects I'm proud of — each one a unique challenge solved with creativity and precision."
        />

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 ${
                activeCategory === cat
                  ? "border-white text-white bg-white/5"
                  : "border-white/10 text-[#444] hover:border-white/30 hover:text-[#888]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
