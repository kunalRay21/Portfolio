"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

/**
 * SectionHeader Component
 * =======================
 *
 * Reusable header for About section subsections.
 * Consistent styling with badge, title, and subtitle.
 */

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = "left",
}: SectionHeaderProps) {
  const alignClass =
    align === "center" ? "items-center text-center" : "items-start";

  return (
    <motion.div
      className={`flex flex-col ${alignClass} mb-8`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm mb-4">
          <span className="text-sm font-medium text-emerald-300">{badge}</span>
        </div>
      )}

      <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
        {title}
      </h2>

      {subtitle && (
        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
