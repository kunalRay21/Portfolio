import { div } from "framer-motion/client";
import { projects } from "./projectsData";
import ProjectShowcase from "./ProjectShowcase";

// Frontend-only component with demo projects
export default function ProjectsSection() {
  return (
    <div className="min-h-screen">
      <ProjectShowcase projects={projects} />
    </div>
  );
}
