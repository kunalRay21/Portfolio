import { Project } from "./types";

// This could be fetched from an API, CMS, or database in a real application
export const projects: Project[] = [
  {
    id: 1,
    title: "PartsBigBoss",
    slug: "partsbigboss",
    image: "/partsBigBoss.png",
    description:
      "A scalable e-commerce platform for automotive parts featuring high-performance search, category-driven navigation, and conversion-focused UI patterns.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Supabase",
    ],
    githubUrl: "https://github.com/yourusername/partsbigboss",
    demoUrl: "https://partsbigboss.com",
    featured: true,
    category: "E-commerce / Product UI",
  },
  {
    id: 2,
    title: "High-Performance Search System",
    slug: "search-system",
    image: "/search-system.png",
    description:
      "A production-grade search and filtering system built for large datasets, focusing on instant suggestions, debounced queries, and UX-first result ranking.",
    technologies: ["Next.js", "TypeScript", "React", "Debouncing", "Search UX"],
    githubUrl: "https://github.com/yourusername/search-system",
    demoUrl: "https://search-demo.com",
    featured: true,
    category: "Frontend Systems",
  },
  {
    id: 3,
    title: "Event Management Calendar",
    slug: "event-calendar",
    image: "/CalendarComponent.png",
    description:
      "A dynamic event management calendar designed for scheduling, visual clarity, and scalability, focusing on component reusability and clean state handling.",
    technologies: ["React", "TypeScript", "CSS Grid", "Date Logic"],
    githubUrl: "https://github.com/yourusername/event-calendar",
    demoUrl: "https://calendar-demo.com",
    featured: true,
    category: "UI Systems / Logic",
  },
];

// Helper function to get projects (can be async in real app)
export async function getProjects(): Promise<Project[]> {
  // In a real app, this would fetch from an API or database
  // await new Promise(resolve => setTimeout(resolve, 100));
  return projects;
}

// Get a single project by slug
export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  return projects.find((project) => project.slug === slug);
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
