"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { personalInfo } from "@/lib/data";

const codeLines = [
  { line: "01", code: "const developer = {", indent: 0 },
  { line: "02", code: `name: "${personalInfo.name}",`, indent: 1 },
  { line: "03", code: 'role: "Front-End & UI/UX",', indent: 1 },
  { line: "04", code: `location: "${personalInfo.location}",`, indent: 1 },
  { line: "05", code: "experience: 4,", indent: 1 },
  { line: "06", code: "openToWork: true,", indent: 1 },
  { line: "07", code: "chocolatePerDay: Infinity,", indent: 1 },
  { line: "08", code: "};", indent: 0 },
];

export default function About() {
  return (
    <section id="about" className="min-h-screen flex items-center py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div>
            <SectionTitle
              label="About Me"
              title={`Get to\nKnow Me.`}
              subtitle={personalInfo.bio}
            />

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-8 flex items-center gap-4"
            >
              <a
                href="/cv.pdf"
                download
                className="font-mono text-xs tracking-widest uppercase border border-white/20 px-6 py-3 text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Download CV
              </a>
              <span className="flex items-center gap-2 font-mono text-xs text-[#444]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for work
              </span>
            </motion.div>
          </div>

          {/* Right: Code card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Decorative corner */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-l border-t border-white/20" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r border-b border-white/20" />

            <div className="bg-[#0c0c0c] border border-white/8 overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="ml-2 font-mono text-sm text-[#444]">developer.ts</span>
              </div>

              {/* Code block */}
              <div className="p-5 sm:p-8 overflow-x-auto whitespace-nowrap">
                {codeLines.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex gap-4 py-0.5"
                  >
                    <span className="font-mono text-sm text-[#2a2a2a] select-none w-8 text-right">
                      {item.line}
                    </span>
                    <span
                      className="font-mono text-sm text-[#888]"
                      style={{ paddingLeft: `${item.indent * 16}px` }}
                    >
                      {item.indent > 0 ? (
                        <>
                          <span className="text-[#555]">{item.code.split(":")[0]}</span>
                          {item.code.includes(":") && (
                            <>
                              <span className="text-[#444]">: </span>
                              <span className="text-white/60">
                                {item.code.split(": ").slice(1).join(": ")}
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        <span className="text-[#666]">{item.code}</span>
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
