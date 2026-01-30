/**
 * About Section Exports
 * ======================
 *
 * Centralized exports for all About section components.
 * Import from this file for cleaner imports elsewhere.
 *
 * @example
 * import { AboutSection, aboutData } from '@/app/components/About';
 */

export { default as AboutSection } from "./AboutSection";
export { default as SectionHeader } from "./SectionHeader";
export { default as StatsGrid } from "./StatsGrid";
export { default as SkillsList } from "./SkillsList";
export { default as ExperienceTimeline } from "./ExperienceTimeline";
export { default as EducationTimeline } from "./EducationTimeline";

export { aboutData } from "./aboutData";
export type { AboutData, Skill, Experience, Education } from "./types";
