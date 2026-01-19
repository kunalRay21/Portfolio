export interface Project {
  id: number;
  title: string;
  slug: string;
  image: string;
  description: string;
  technologies: string[];
  link: string;
  featured?: boolean;
  category?: string;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
  priority?: boolean;
}
