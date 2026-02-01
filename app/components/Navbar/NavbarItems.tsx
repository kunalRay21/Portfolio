export interface NavItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export const navItems: NavItem[] = [
  {
    id: "about",
    label: "About",
    href: "#about",
  },
  {
    id: "resume",
    label: "Resume",
    href: "/Ray.pdf",
    isExternal: true,
  },
];
