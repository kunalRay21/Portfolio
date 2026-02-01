import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiDjango,
  SiFlask,
  SiPostgresql,
  SiSupabase,
  SiGit,
  SiGithub,
  SiDocker,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { FaJava } from "react-icons/fa";

export const techIconMap: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    url: string;
    color: string;
  }
> = {
  react: {
    icon: SiReact,
    url: "https://react.dev/",
    color: "#61DAFB",
  },
  typescript: {
    icon: SiTypescript,
    url: "https://www.typescriptlang.org/",
    color: "#3178C6",
  },
  tailwind: {
    icon: SiTailwindcss,
    url: "https://tailwindcss.com/",
    color: "#06B6D4",
  },
  "react-native": {
    icon: TbBrandReactNative,
    url: "https://reactnative.dev/",
    color: "#61DAFB",
  },
  python: {
    icon: SiPython,
    url: "https://www.python.org/",
    color: "#3776AB",
  },
  java: {
    icon: FaJava,
    url: "https://www.java.com/",
    color: "#007396",
  },
  databases: {
    icon: SiPostgresql,
    url: "https://www.postgresql.org/",
    color: "#4169E1",
  },
  git: {
    icon: SiGit,
    url: "https://git-scm.com/",
    color: "#F05032",
  },
  docker: {
    icon: SiDocker,
    url: "https://www.docker.com/",
    color: "#2496ED",
  },
};
