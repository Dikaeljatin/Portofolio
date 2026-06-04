export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  category: "web" | "mobile" | "fullstack" | "other";
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "database" | "tools" | "language";
  level: number; // 1-100
  icon?: string;
}

export interface TechOrbit {
  name: string;
  icon: string;
  orbit: 1 | 2 | 3;
  color?: string;
  description: string;
}

export interface JourneyMilestone {
  id: string;
  year: string;
  month?: string;
  title: string;
  organization: string;
  description: string;
  type: "education" | "work" | "project" | "achievement";
  tags?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  current?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
