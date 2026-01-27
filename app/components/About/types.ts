/**
 * About Section Type Definitions
 * ===============================
 */

export interface Skill {
  id: string;
  name: string;
  category: "frontend" | "backend" | "tools" | "design";
  proficiency: number; // 0-100
  icon?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
  current?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export interface AboutData {
  headlinePrefix: string;
  headlineCenter:string;
  headlineHighlight: string;
  description: string;
  tagline: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  stats: {
    label: string;
    value: string;
  }[];
}
