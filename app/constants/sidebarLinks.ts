import { Linkedin, Github, Mail, FileText, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SidebarLink {
  href: string;
  label: string;
  color: string;
  icon: LucideIcon;
}

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    href: "https://www.linkedin.com/in/kunal-ray-25971b331/",
    label: "Linkedin",
    color: "#345995",
    icon: Linkedin,
  },
  {
    href: "https://github.com",
    label: "About",
    color: "#029B00",
    icon: User,
  },
  {
    href: "mailto:kunalray2701@gmail.com",
    label: "Contact",
    color: "#ED9121",
    icon: Mail,
  },
  {
    href: "https://github.com/raykunal13",
    label: "Github",
    color: "#57ADEC",
    icon: Github,
  },
  {
    href: "#",
    label: "Blog",
    color: "#CBDF92",
    icon: FileText,
  },
];
