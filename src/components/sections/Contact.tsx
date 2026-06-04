"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { personalInfo, socialLinks } from "@/lib/data";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-padding relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle
          label="Get in Touch"
          title={`Let's build\nsomething\namazing.`}
          subtitle="Have a project in mind? Let's talk. I'm always open to new opportunities and interesting collaborations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Info */}
          <div className="flex flex-col gap-10">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-mono text-xs text-[#333] uppercase tracking-widest mb-3">Email</p>
              <button
                onClick={copyEmail}
                className="group flex items-center gap-3 text-xl font-semibold text-white hover:text-[#888] transition-colors duration-300"
              >
                {personalInfo.email}
                <motion.span
                  animate={{ opacity: copied ? 1 : 0.3 }}
                  className="font-mono text-xs text-[#555] group-hover:text-[#888]"
                >
                  {copied ? "Copied!" : "Copy"}
                </motion.span>
              </button>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="font-mono text-xs text-[#333] uppercase tracking-widest mb-3">Location</p>
              <p className="text-lg text-white">{personalInfo.location}</p>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="font-mono text-xs text-[#333] uppercase tracking-widest mb-4">
                Social Links
              </p>
              <div className="flex flex-col gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border border-white/8 px-4 py-3 hover:border-white/25 hover:bg-white/2 transition-all duration-300"
                  >
                    <span className="text-sm text-[#666] group-hover:text-white transition-colors duration-300">
                      {social.platform}
                    </span>
                    <span className="font-mono text-xs text-[#333] group-hover:text-[#888] transition-colors duration-300">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 border border-white/8 p-4"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <p className="font-mono text-xs text-[#555]">
                Currently available for freelance & full-time opportunities
              </p>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center gap-6 border border-white/8 p-12 text-center"
              >
                <div className="w-16 h-16 border border-white/20 flex items-center justify-center text-3xl">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-[#555] text-sm">
                    Thank you for reaching out. I will reply within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setSent(false)}
                  className="font-mono text-xs text-[#444] hover:text-white transition-colors duration-300 underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block font-mono text-xs text-[#333] uppercase tracking-widest mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-[#0a0a0a] border border-white/8 px-4 py-3 text-sm text-white placeholder-[#2a2a2a] focus:outline-none focus:border-white/30 transition-colors duration-300 font-sans"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-[#333] uppercase tracking-widest mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-[#0a0a0a] border border-white/8 px-4 py-3 text-sm text-white placeholder-[#2a2a2a] focus:outline-none focus:border-white/30 transition-colors duration-300 font-sans"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block font-mono text-xs text-[#333] uppercase tracking-widest mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Collaboration"
                    className="w-full bg-[#0a0a0a] border border-white/8 px-4 py-3 text-sm text-white placeholder-[#2a2a2a] focus:outline-none focus:border-white/30 transition-colors duration-300 font-sans"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-xs text-[#333] uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full bg-[#0a0a0a] border border-white/8 px-4 py-3 text-sm text-white placeholder-[#2a2a2a] focus:outline-none focus:border-white/30 transition-colors duration-300 resize-none font-sans"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="relative w-full bg-white text-black py-4 font-mono text-xs tracking-widest uppercase hover:bg-[#e0e0e0] transition-colors duration-300 disabled:opacity-50"
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="block w-3 h-3 border border-black/30 border-t-black rounded-full"
                      />
                      Sending...
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
