"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { journeyMilestones } from "@/lib/data";
import type { JourneyMilestone } from "@/types";

const typeColors: Record<JourneyMilestone["type"], string> = {
  education: "text-[#888]",
  work: "text-white",
  project: "text-[#666]",
  achievement: "text-[#aaa]",
};

const typeLabels: Record<JourneyMilestone["type"], string> = {
  education: "Education",
  work: "Work",
  project: "Project",
  achievement: "Achievement",
};

function MilestoneCard({ milestone, index }: { milestone: JourneyMilestone; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`relative flex gap-8 ${isEven ? "flex-row" : "flex-row-reverse"} md:items-start`}
    >
      {/* Content */}
      <div className={`flex-1 ${isEven ? "text-right" : "text-left"} hidden md:block`}>
        {isEven ? (
          <div className="ml-auto max-w-sm">
            <MilestoneContent milestone={milestone} align="right" />
          </div>
        ) : (
          <div />
        )}
      </div>

      {/* Center dot + connector */}
      <div className="flex flex-col items-center gap-0 flex-shrink-0">
        <motion.div
          whileHover={{ scale: 1.3 }}
          className="w-4 h-4 border-2 border-white/40 bg-[#080808] relative z-10 cursor-pointer group"
        >
          <div className="absolute inset-1 bg-white/20 group-hover:bg-white/60 transition-colors duration-300" />
        </motion.div>
      </div>

      {/* Content (right side on desktop, always shown on mobile) */}
      <div className={`flex-1 ${isEven ? "hidden md:block" : "text-left"}`}>
        {!isEven || true ? (
          <div className="max-w-sm">
            <MilestoneContent
              milestone={milestone}
              align={isEven ? "left" : "left"}
              showOnDesktopOnly={isEven}
            />
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

function MilestoneContent({
  milestone,
  align,
  showOnDesktopOnly,
}: {
  milestone: JourneyMilestone;
  align: "left" | "right";
  showOnDesktopOnly?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`group border border-white/8 p-5 bg-[#0a0a0a] hover:border-white/20 hover:bg-[#0f0f0f] transition-all duration-300 ${
        showOnDesktopOnly ? "hidden md:block" : ""
      } ${align === "right" ? "text-right" : "text-left"}`}
    >
      {/* Header */}
      <div
        className={`flex items-center gap-3 mb-3 ${
          align === "right" ? "flex-row-reverse" : ""
        }`}
      >
        <span className="font-mono text-xs text-[#333] tracking-widest">
          {milestone.month} {milestone.year}
        </span>
        <span
          className={`font-mono text-xs uppercase tracking-widest ${typeColors[milestone.type]}`}
        >
          {typeLabels[milestone.type]}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-white group-hover:text-white transition-colors mb-1">
        {milestone.title}
      </h3>
      <p className="font-mono text-xs text-[#444] mb-3">{milestone.organization}</p>

      {/* Description */}
      <p className="text-sm text-[#555] leading-relaxed">{milestone.description}</p>

      {/* Tags */}
      {milestone.tags && (
        <div
          className={`flex flex-wrap gap-1.5 mt-4 ${align === "right" ? "justify-end" : ""}`}
        >
          {milestone.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs border border-white/8 px-2 py-0.5 text-[#444] group-hover:border-white/15 group-hover:text-[#666] transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="section-padding relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle
          label="My Digital Journey"
          title={`The Road\nThat Made Me`}
          subtitle="Every milestone, every breakthrough, every late-night debugging session that shaped who I am as a developer."
        />

        <div ref={containerRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-[50%] md:left-[50%] left-[1.5rem] top-0 bottom-0 w-px bg-white/5 transform -translate-x-1/2 md:-translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-white/40 to-white/10 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Milestones */}
          <div className="flex flex-col gap-12 relative">
            {journeyMilestones.map((milestone, i) => (
              <MilestoneCard key={milestone.id} milestone={milestone} index={i} />
            ))}
          </div>

          {/* End dot */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-[50%] transform -translate-x-1/2 w-3 h-3 border border-white/30 bg-[#080808] flex items-center justify-center"
          >
            <div className="w-1 h-1 bg-white/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
