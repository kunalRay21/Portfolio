import { AboutData } from "./types";

/**
 * About Section Data
 * ==================
 *
 * Centralized data for the About section.
 * Update this file to reflect your personal information.
 */

export const aboutData: AboutData = {
  headline: "Crafting Digital Experiences",
  tagline: "Full-Stack Developer & Designer",
  description:
    "I'm a passionate developer who transforms complex problems into elegant, user-centric solutions. With a keen eye for design and a deep understanding of modern web technologies, I bridge the gap between creativity and functionality.",

  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Happy Clients", value: "30+" },
    { label: "Code Commits", value: "10k+" },
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
      id: "framer",
      name: "Framer Motion",
      category: "frontend",
      proficiency: 85,
    },

    // Backend
    {
      id: "nodejs",
      name: "Node.js",
      category: "backend",
      proficiency: 88,
    },
    {
      id: "python",
      name: "Python",
      category: "backend",
      proficiency: 82,
    },
    {
      id: "databases",
      name: "SQL & NoSQL",
      category: "backend",
      proficiency: 85,
    },

    // Tools & Design
    {
      id: "git",
      name: "Git & GitHub",
      category: "tools",
      proficiency: 90,
    },
    {
      id: "figma",
      name: "Figma",
      category: "design",
      proficiency: 88,
    },
    {
      id: "docker",
      name: "Docker",
      category: "tools",
      proficiency: 75,
    },
  ],

  experience: [
    {
      id: "exp1",
      role: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      duration: "2022 - Present",
      description:
        "Leading frontend development initiatives, architecting scalable React applications, and mentoring junior developers.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      current: true,
    },
    {
      id: "exp2",
      role: "Full-Stack Developer",
      company: "Digital Solutions Co.",
      duration: "2020 - 2022",
      description:
        "Developed and maintained full-stack web applications, implemented RESTful APIs, and optimized database performance.",
      technologies: ["Node.js", "React", "MongoDB", "Express"],
    },
    {
      id: "exp3",
      role: "Frontend Developer",
      company: "Creative Agency",
      duration: "2019 - 2020",
      description:
        "Created responsive websites and interactive user interfaces for diverse clients across various industries.",
      technologies: ["JavaScript", "Vue.js", "SASS", "Webpack"],
    },
  ],

  education: [
    {
      id: "edu1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      year: "2019",
      description:
        "Graduated with honors, specializing in Web Development and User Experience Design.",
    },
  ],
};
