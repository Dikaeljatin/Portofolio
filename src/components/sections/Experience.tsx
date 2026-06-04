"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { experiences } from "@/lib/data";
import type { Experience } from "@/types";

function ExperienceItem({ exp, index }: { exp: Experience; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="border border-white/8 hover:border-white/15 transition-colors duration-300"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start justify-between gap-4 sm:gap-6 p-4 sm:p-6 text-left group"
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-base font-semibold text-white">{exp.role}</h3>
            {exp.current && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-[#555]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Current
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-[#555]">{exp.company}</span>
            <span className="font-mono text-xs text-[#333] tracking-widest">{exp.period}</span>
          </div>
        </div>

        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-8 h-8 border border-white/10 flex items-center justify-center text-[#555] group-hover:border-white/30 group-hover:text-white transition-colors duration-300 mt-0.5"
        >
          +
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-white/5">
              <p className="text-sm text-[#555] mt-5 mb-6 leading-relaxed">{exp.description}</p>

              {/* Responsibilities */}
              <ul className="space-y-2 mb-6">
                {exp.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#333] mt-1.5 text-xs">—</span>
                    <span className="text-sm text-[#666]">{r}</span>
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs border border-white/8 px-3 py-1 text-[#444]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle
          label="Experience"
          title={`Where I've\nbeen building.`}
          subtitle="Professional experiences that have sharpened my skills and broadened my perspective."
        />

        <div className="flex flex-col gap-3 max-w-3xl">
          {experiences.map((exp, i) => (
            <ExperienceItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
