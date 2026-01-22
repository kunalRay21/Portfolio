"use client";

import { Project } from "./types";
import ProjectShowcase from "./ProjectShowcase";

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  return <ProjectShowcase projects={projects} />;
}
