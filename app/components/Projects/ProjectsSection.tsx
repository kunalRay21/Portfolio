import { projects } from "./projectsData";
import ProjectsClient from "./ProjectsClient";

// Frontend-only component with demo projects
export default function ProjectsSection() {
  return <ProjectsClient projects={projects} />;
}
