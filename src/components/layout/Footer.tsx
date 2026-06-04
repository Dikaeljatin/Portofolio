"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { socialLinks, personalInfo } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-mono text-xs tracking-widest text-[#555]">
            © {year} {personalInfo.name}
          </span>
        </div>

        <div className="flex items-center gap-6">
          {socialLinks.map((social) => (
            <Link
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest text-[#444] hover:text-white transition-colors duration-300 uppercase"
            >
              {social.platform}
            </Link>
          ))}
        </div>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ y: -3 }}
          className="font-mono text-xs tracking-widest text-[#444] hover:text-white transition-colors duration-300 uppercase border border-white/10 px-4 py-2 hover:border-white/30"
        >
          Back to Top ↑
        </motion.button>
      </div>
    </footer>
  );
}
