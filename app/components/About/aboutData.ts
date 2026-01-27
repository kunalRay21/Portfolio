import { AboutData } from "./types";

/**
 * About Section Data
 * ==================
 *
 * Centralized data for the About section.
 * Update this file to reflect your personal information.
 */

export const aboutData: AboutData = {
  headlinePrefix: "Engineering",
  headlineCenter: "Scalable",
  headlineHighlight: "Solutions",
  tagline: "Computer Science Engineer & Full-Stack Developer",
  description:
    "I am a Computer Science Engineer dedicated to growing my technical expertise by building practical, real-world applications. My focus is on mastering Data Structures & Algorithms while developing robust web solutions that bridge complex backend logic with responsive, user-centric frontends.",

  stats: [
    { label: "Years Experience", value: "2+" },
    { label: "Projects Built", value: "12+" },
    { label: "Tech Stack", value: "MERN/PERN" },
    { label: "Commits", value: "1k+" },
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
      role: "Lead Full-Stack Developer",
      company: "Parts Big Boss (Project)",
      duration: "Jan 2026 - Present",
      description:
        "Developing a comprehensive e-commerce platform using the PERN stack. Replicating Magento functionalities and integrating Odoo for backend operations and inventory management.",
      technologies: ["React", "Node.js", "PostgreSQL", "Odoo"],
      current: true,
    },
    {
      id: "exp2",
      role: "Hackathon Developer",
      company: "Smart India Hackathon",
      duration: "Sep 2025",
      description:
        "Designed and built a healthcare application for migrants in Kerala. Implemented a Python/Django backend with a React & Tailwind CSS frontend to solve language barrier issues in medical access.",
      technologies: ["React", "Python", "Django", "Tailwind CSS"],
    },
    {
      id: "exp3",
      role: "Web Developer",
      company: "Personal Projects",
      duration: "2024 - 2025",
      description:
        "Built various applications including 'CircuitCart' (e-commerce) and a movie app. Focused on mastering state management, API integration, and responsive UI design.",
      technologies: ["JavaScript", "React.js", "Supabase", "CSS"],
    },
  ],

  education: [
    {
      id: "edu1",
      degree: "Bachelor of Technology in Computer Science",
      institution: "Noida Institute of Engineering and Technology", // Replace with your actual University name
      year: "2028 (Expected)",
      description:
        "Focusing on Data Structures & Algorithms, Web Development, and Software Engineering principles.",
    },
  ],
};
