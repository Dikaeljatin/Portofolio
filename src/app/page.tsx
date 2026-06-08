import GridBackground from "@/components/ui/GridBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";

import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Global decorative elements */}
      <GridBackground />
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Page content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />

        <Projects />
        <Contact />
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
