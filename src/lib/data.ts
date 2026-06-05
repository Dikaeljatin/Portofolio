import type { Project, Skill, TechOrbit, JourneyMilestone, Experience, SocialLink } from "@/types";

export const personalInfo = {
  name: "M Agradika Ridhal Eljatin",
  title: "Front-End Developer | UI/UX Designer",
  tagline: "Building modern web experiences with clean design, seamless interactions, and high-performance solutions.",
  bio: "I am an Informatics student at Universitas Syiah Kuala and a passionate Front-End Developer and UI/UX Designer. With a strong interest in modern web technologies and user-centered design, I focus on developing responsive, accessible, and visually appealing web applications. I continuously strive to improve my technical and design skills to create digital experiences that are both innovative and impactful.",
  location: "Banda Aceh, Indonesia",
  email: "agradikaeljatin@gmail.com",
  availableForWork: true,
  stats: [
    { label: "Years Experience", value: "4+" },
    { label: "Projects Completed", value: "30+" },
    { label: "Clients Served", value: "15+" },
    { label: "Coffee Consumed", value: "∞" },
  ],
};

export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/Dikaeljatin", icon: "github" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/m-agradika-ridhal-eljatin", icon: "linkedin" },
  { platform: "Instagram", url: "https://www.instagram.com/dikaeljatin/", icon: "instagram" },
];

export const skills: Skill[] = [
  { name: "TypeScript", category: "language", level: 90 },
  { name: "Next.js", category: "frontend", level: 88 },
  { name: "JavaScript", category: "language", level: 92 },
  { name: "Express.js", category: "backend", level: 85 },
  { name: "Node.js", category: "backend", level: 88 },
  { name: "Python", category: "language", level: 80 },
  { name: "React", category: "frontend", level: 90 },
  { name: "HTML", category: "frontend", level: 95 },
  { name: "CSS", category: "frontend", level: 90 },
  { name: "Tailwind CSS", category: "frontend", level: 92 },
  { name: "Docker", category: "tools", level: 75 },
  { name: "Supabase", category: "backend", level: 82 },
  { name: "MySQL", category: "database", level: 85 },
  { name: "Figma", category: "tools", level: 78 },
];

export const techOrbits: TechOrbit[] = [
  // Inner orbit - core
  { name: "React", icon: "⚛", orbit: 1, description: "UI Library — My primary tool for building interactive interfaces" },
  { name: "Next.js", icon: "▲", orbit: 1, description: "React Framework — Full-stack web development powerhouse" },
  { name: "TypeScript", icon: "TS", orbit: 1, description: "Typed JavaScript — Writing safer, more maintainable code" },
  { name: "Node.js", icon: "⬡", orbit: 1, description: "Runtime — Server-side JavaScript execution" },

  // Middle orbit - languages & styling
  { name: "JavaScript", icon: "JS", orbit: 2, description: "Core Language — The foundation of modern web development" },
  { name: "Python", icon: "PY", orbit: 2, description: "Programming Language — Versatile and reliable for scripts & backends" },
  { name: "Express.js", icon: "⊙", orbit: 2, description: "Backend Framework — Fast, unopinionated, minimalist web framework" },
  { name: "Tailwind CSS", icon: "~", orbit: 2, description: "CSS Framework — Utility-first styling at lightning speed" },
  { name: "HTML", icon: "⟨/⟩", orbit: 2, description: "Markup — The skeleton of every web page" },
  { name: "CSS", icon: "✦", orbit: 2, description: "Styling — Crafting beautiful visual experiences" },

  // Outer orbit - tools & databases
  { name: "Supabase", icon: "⚡", orbit: 3, description: "Backend as a Service — Open source Firebase alternative" },
  { name: "MySQL", icon: "◫", orbit: 3, description: "Database — Structured data management & optimization" },
  { name: "Docker", icon: "◻", orbit: 3, description: "Container — Shipping code that runs anywhere" },
  { name: "Figma", icon: "✤", orbit: 3, description: "Design — Bridging the gap between design and code" },
];

export const journeyMilestones: JourneyMilestone[] = [];

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Senior Full Stack Developer",
    company: "ByteCraft Solutions",
    period: "Aug 2024 — Present",
    description: "Leading development of enterprise-grade web applications and mentoring junior developers.",
    responsibilities: [
      "Architecting scalable frontend solutions using Next.js and TypeScript",
      "Leading a team of 3 developers across multiple client projects",
      "Implementing CI/CD pipelines and DevOps best practices",
      "Conducting code reviews and establishing coding standards",
      "Collaborating directly with clients to translate business needs into technical solutions",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
    current: true,
  },
  {
    id: "2",
    role: "Junior Full Stack Developer",
    company: "ByteCraft Solutions",
    period: "Apr 2023 — Jul 2024",
    description: "Developed and maintained production web applications for multiple clients.",
    responsibilities: [
      "Built responsive frontends using React and Tailwind CSS",
      "Developed RESTful APIs with Node.js and Express",
      "Optimized database queries reducing load time by 40%",
      "Participated in agile sprints and daily standups",
    ],
    technologies: ["React", "Node.js", "MySQL", "Tailwind CSS", "Git"],
    current: false,
  },
  {
    id: "3",
    role: "Frontend Developer Intern",
    company: "TechVision Studio",
    period: "Mar 2022 — Feb 2023",
    description: "Contributed to client projects at a creative digital agency.",
    responsibilities: [
      "Developed UI components using React and CSS animations",
      "Collaborated with designers to implement pixel-perfect layouts",
      "Maintained and improved existing codebases",
      "Participated in client presentations and demos",
    ],
    technologies: ["React", "CSS3", "JavaScript", "Figma", "Git"],
    current: false,
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "OneCare",
    description: "OneCare is an integrated healthcare web application designed to connect patients with doctors, healthcare facilities, and medical records in one easily accessible platform.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Dikaeljatin/Onecare",
    demoUrl: "https://demo.com",
    imageUrl: "/logoOC.png",
    featured: true,
    category: "web",
  },
  {
    id: "2",
    title: "MoneyFlow",
    description: "MoneyFlow is a web-based personal finance management application that helps users record income and expenses, monitor financial status, and analyze transactions through an interactive dashboard.",
    technologies: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com/Dikaeljatin/Moneyflow",
    demoUrl: "https://moneyflow-ruddy.vercel.app/",
    imageUrl: "/logoMF.png",
    featured: true,
    category: "web",
  },
];
