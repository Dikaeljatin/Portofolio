import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "M Agradika Ridhal Eljatin — Full Stack Web Developer",
  description:
    "Portfolio of M Agradika Ridhal Eljatin, a passionate Full Stack Web Developer crafting premium digital experiences with React, Next.js, Node.js, and modern web technologies.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Web Developer Portfolio",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "M Agradika Ridhal Eljatin" }],
  openGraph: {
    title: "M Agradika Ridhal Eljatin — Full Stack Web Developer",
    description: "Crafting digital experiences that matter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans bg-[#080808] text-white antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
