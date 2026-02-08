import { AboutData } from "./types";

/**
 * About Section Data
 * ==================
 *
 * Centralized data for the About section.
 * Update this file to reflect your personal information.
 */

export const aboutData: AboutData = {
  headlinePrefix: "Architecting",
  headlineCenter: "Digital",
  headlineHighlight: "Infrastructures",
  tagline: "Full-Stack Operator & Systems Engineer",
  description:
    "I operate at the intersection of complex backend logic and user-centric frontend protocols. My mission is to engineer robust, scalable applications that solve real-world parameters. By mastering algorithms and leveraging modern frameworks, I transform abstract concepts into production-grade systems. I am dedicated to writing clean, maintainable code—optimizing performance and ensuring seamless execution across all digital environments.",

  stats: [
    { label: "PROTOCOL", value: "Full-Stack Dev" },
    { label: "MASTERY", value: "System Architecture" },
    { label: "ALGORITHM", value: "Data Structures" },
    { label: "OUTPUT", value: "High Fidelity" },
  ],

  skills: [
    // Frontend
    {
      id: "react",
      name: "React & Next.js",
      category: "frontend",
      proficiency: 95,
    },
    {
      id: "typescript",
      name: "TypeScript",
      category: "frontend",
      proficiency: 90,
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      category: "frontend",
      proficiency: 95,
    },
    {
      id: "react-native",
      name: "React Native",
      category: "frontend",
      proficiency: 80,
    },

    // Backend
    {
      id: "python",
      name: "Python (Django/Flask)",
      category: "backend",
      proficiency: 85,
    },
    {
      id: "java",
      name: "Java",
      category: "backend",
      proficiency: 80,
    },
    {
      id: "databases",
      name: "PostgreSQL & Supabase",
      category: "backend",
      proficiency: 88,
    },

    // Tools & Design
    {
      id: "git",
      name: "Git & GitHub",
      category: "tools",
      proficiency: 90,
    },
    {
      id: "odoo",
      name: "Odoo ERP",
      category: "tools",
      proficiency: 75,
    },
    {
      id: "docker",
      name: "Docker",
      category: "tools",
      proficiency: 70,
    },
  ],

  experience: [
    {
      id: "exp1",
      role: "Lead Systems Architect",
      company: "Parts Big Boss (Start Up)",
      duration: "Jan 2026 - Present",
      description:
        "Orchestrating a comprehensive e-commerce platform using the PERN stack. Re-engineering Magento core functionalities and integrating Odoo modules for seamless backend operations and specialized inventory management.",
      technologies: ["React", "Node.js", "PostgreSQL", "Odoo"],
      current: true,
    },
    {
      id: "exp2",
      role: "Hackathon Engineer",
      company: "Smart India Hackathon",
      duration: "Sep 2025",
      description:
        "Designed and deployed a healthcare access system for migrant demographics in Kerala. Engineered a hybrid Python/Django backend coupled with a React frontend to overcome linguistic barriers in medical data processing.",
      technologies: ["React", "Python", "Django", "Tailwind CSS"],
    },
    {
      id: "exp3",
      role: "Application Developer",
      company: "Independent Labs",
      duration: "2024 - 2025",
      description:
        "Developed multiple experimental applications including 'CircuitCart' (e-commerce engine) and a media aggregation platform. Focused on state management optimization, API protocol integration, and responsive interface standards.",
      technologies: ["JavaScript", "React.js", "Supabase", "CSS"],
    },
  ],

  education: [
    {
      id: "edu1",
      degree: "B.Tech in Computer Science",
      institution: "Noida Institute of Engineering & Technology",
      year: "2028 (Target)",
      description:
        "Specializing in Advanced Algorithms, Systems Engineering, and Full-Stack Architecture patterns.",
    },
  ],
};
