"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  children?: ReactNode;
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  align = "left",
  children,
}: SectionTitleProps) {
  const textAlign = align === "center" ? "text-center items-center" : "items-start";

  return (
    <motion.div
      className={`flex flex-col gap-4 mb-16 ${textAlign}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {label && (
        <span className="font-mono text-xs tracking-[0.3em] text-[#555] uppercase">
          {label}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#666] text-base md:text-lg max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  );
}
