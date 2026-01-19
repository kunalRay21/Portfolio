"use client";

import { motion, useScroll, useVelocity, useTransform } from "framer-motion";
import { useRef, useMemo, useState } from "react";
import { Project } from "./types";
import Carousel3D from "./Carousel3D";

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const containerRef = useRef(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [centeredProjectIndex, setCenteredProjectIndex] = useState(0);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState<number | null>(
    null,
  );

  // Track scroll velocity for carousel sync
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useTransform(scrollVelocity, [0, 1000], [0, 1000]);

  // Current project for right panel - priority: hovered > manually selected > auto-centered
  const displayIndex =
    hoveredProjectIndex ??
    (selectedProjectIndex !== centeredProjectIndex
      ? selectedProjectIndex
      : centeredProjectIndex);
  const currentProject = projects[displayIndex] || projects[0];

  // Generate consistent particle positions to avoid hydration errors
  const particles = useMemo(
    () =>
      [...Array(15)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 5,
      })),
    [],
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Subtle emerald gradient overlay - matching Hero's color scheme */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />

      {/* Contrast + vignette - similar to Hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

      {/* Aurora glow layer matching Hero */}
      <div className="absolute inset-0 hero-aurora opacity-60" />

      {/* Floating particles - matching Hero theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-emerald-300/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-medium text-emerald-300">
              Selected Works
            </span>
          </motion.div>

          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Projects
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl">
            Crafting digital experiences that push boundaries and challenge
            conventions
          </p>
        </motion.div>

        {/* Split-screen layout: 3D Carousel + Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[600px]">
          {/* LEFT COLUMN: 3D Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[600px]"
          >
            <Carousel3D
              projects={projects}
              scrollVelocity={smoothVelocity.get()}
              onHoverChange={setHoveredProjectIndex}
              onCenterChange={(index) => {
                setCenteredProjectIndex(index);
                // Auto-sync the selected index with centered unless user manually selected
                if (hoveredProjectIndex === null) {
                  setSelectedProjectIndex(index);
                }
              }}
            />
          </motion.div>

          {/* RIGHT COLUMN: Glassmorphic Content Panel */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative flex items-center"
          >
            {/* Glassmorphism container */}
            <div className="relative w-full p-10 rounded-3xl overflow-hidden group">
              {/* Glass background with blur */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-2xl" />

              {/* Border gradient */}
              <div className="absolute inset-0 rounded-3xl border border-white/10" />

              {/* Animated gradient border on hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(20, 184, 166, 0.3))",
                  filter: "blur(20px)",
                }}
              />

              {/* Content */}
              <div className="relative z-10 space-y-8">
                {/* Project Title */}
                <motion.div
                  key={currentProject.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-medium text-emerald-300">
                      {currentProject.category || "Featured Project"}
                    </span>
                  </motion.div>

                  <h3 className="text-5xl font-bold text-white mb-6 leading-tight">
                    {currentProject.title}
                  </h3>
                </motion.div>

                {/* Description */}
                <motion.div
                  key={currentProject.description}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg font-semibold text-emerald-300">
                    About the Project
                  </h4>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {currentProject.description}
                  </p>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  key={currentProject.technologies.join()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg font-semibold text-emerald-300">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {currentProject.technologies.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-colors cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.3 + idx * 0.05,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* View Project Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.a
                    href={currentProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 font-medium hover:from-emerald-500/30 hover:to-teal-500/30 transition-all group/btn"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>View Project</span>
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </motion.svg>
                  </motion.a>
                </motion.div>

                {/* Project navigation dots */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex gap-3 pt-6"
                >
                  {projects.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setSelectedProjectIndex(idx)}
                      className="group/dot relative"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          idx === selectedProjectIndex
                            ? "bg-emerald-400 scale-110"
                            : "bg-white/20 group-hover/dot:bg-white/40"
                        }`}
                      />
                      {idx === selectedProjectIndex && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-emerald-400/50"
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Floating glow orb */}
              <motion.div
                className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"
                animate={{
                  x: [0, 30, 0],
                  y: [0, 50, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* View all projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 flex justify-center"
        >
          <motion.button
            className="group relative px-8 py-4 rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm" />
            <div className="absolute inset-0 border border-emerald-500/30 rounded-full" />

            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            <span className="relative z-10 text-white font-medium flex items-center gap-2">
              View All Projects
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
