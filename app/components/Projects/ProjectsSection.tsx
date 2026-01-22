import { projects } from "./projectsData";
import ProjectShowcase from "./ProjectShowcase";

// Frontend-only component with demo projects
export default function ProjectsSection() {
  return <ProjectShowcase projects={projects} />;
}
