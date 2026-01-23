"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "./types";
import Particles from "@/components/Particles";

interface ProjectShowcaseProps {
  projects: Project[];
}

/**
 * ProjectShowcase Component
 * =========================
 *
 * Full-screen section with scroll-trapped horizontal carousel.
 *
 * BEHAVIOR:
 * - Section is 100vh and becomes fixed when in view
 * - User scroll input moves carousel horizontally
 * - Once all projects are viewed, scroll lock releases
 * - Page scroll continues normally after carousel completes
 */

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Navigate to a specific card
  const navigateToCard = (index: number) => {
    if (!carouselRef.current) return;

    const firstCard = carouselRef.current.querySelector(
      ".project-card",
    ) as HTMLElement;
    const cardWidth = firstCard?.offsetWidth || 0;
    const gap = 64; // md:gap-16 = 64px

    const targetScroll = index * (cardWidth + gap);
    setScrollProgress(Math.min(targetScroll, maxScroll));
    setCurrentCardIndex(index);
  };

  // Navigate to previous card
  const handlePrevCard = () => {
    const newIndex = Math.max(0, currentCardIndex - 1);
    navigateToCard(newIndex);
  };

  // Navigate to next card
  const handleNextCard = () => {
    const newIndex = Math.min(projects.length - 1, currentCardIndex + 1);
    navigateToCard(newIndex);
  };

  // Calculate maximum scroll distance
  useEffect(() => {
    if (!carouselRef.current) return;
    const updateMaxScroll = () => {
      const scrollWidth = carouselRef.current?.scrollWidth || 0;
      const containerWidth =
        carouselRef.current?.parentElement?.clientWidth || window.innerWidth;

      // Calculate card width (assuming all cards are same width)
      const firstCard = carouselRef.current?.querySelector(
        ".project-card",
      ) as HTMLElement;
      const cardWidth = firstCard?.offsetWidth || 0;

      // Position where last card is centered in the container
      // scrollWidth - containerWidth brings last card to right edge
      // Add half container width and subtract half card width to center it
      const maxScrollToCenterLastCard =
        scrollWidth - containerWidth / 2 - cardWidth / 2;

      setMaxScroll(Math.max(0, maxScrollToCenterLastCard));
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, [projects]);

  // Update current card index based on scroll progress
  useEffect(() => {
    if (!carouselRef.current) return;

    const firstCard = carouselRef.current.querySelector(
      ".project-card",
    ) as HTMLElement;
    const cardWidth = firstCard?.offsetWidth || 0;
    const gap = 64; // md:gap-16 = 64px

    if (cardWidth > 0) {
      const calculatedIndex = Math.round(scrollProgress / (cardWidth + gap));
      setCurrentCardIndex(
        Math.max(0, Math.min(projects.length - 1, calculatedIndex)),
      );
    }
  }, [scrollProgress, projects.length]);

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only lock on first visit
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.99 &&
          !hasBeenViewed
        ) {
          setIsLocked(true);
        } else if (!entry.isIntersecting) {
          // Reset when section is out of view
          if (scrollProgress >= maxScroll) {
            setIsLocked(false);
          }
        }
      },
      { threshold: [0, 0.99, 1] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [scrollProgress, maxScroll, hasBeenViewed]);

  // Handle scroll events when locked
  useEffect(() => {
    if (!isLocked) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      setScrollProgress((prev) => {
        const newProgress = prev + e.deltaY;
        const clampedProgress = Math.max(0, Math.min(newProgress, maxScroll));

        // Unlock when fully scrolled and mark as viewed
        if (clampedProgress >= maxScroll && e.deltaY > 0) {
          setIsLocked(false);
          setHasBeenViewed(true);
        }

        return clampedProgress;
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isLocked, maxScroll]);

  return (
    <div
      ref={sectionRef}
      className="relative bg-gradient-to-b from-black to-transparent h-screen overflow-hidden"
      style={{
        position: isLocked ? "fixed" : "relative",
        top: isLocked ? 0 : "auto",
        left: 0,
        right: 0,
        zIndex: isLocked ? 50 : "auto",
      }}
    >
      {/* Particles Background */}
      <div className="absolute inset-0 pointer-events-none z-[5]">
        <Particles
          className=""
          particleCount={2000}
          particleSpread={40}
          speed={0.04}
          particleColors={["#ffffff", "#e5e5e5", "#f5f5f5"]}
          alphaParticles={true}
          particleBaseSize={120}
          sizeRandomness={1}
          cameraDistance={10}
          pixelRatio={
            typeof window !== "undefined"
              ? Math.min(window.devicePixelRatio, 2)
              : 1
          }
        />
      </div>

      <div className="flex flex-col md:flex-row h-full min-h-screen relative z-10">
        {/* Left/Top Static Panel - Fixed Information */}
        <div className="w-full md:w-[450px] lg:w-[35%] h-full md:h-full flex flex-col justify-center px-8 md:px-16 z-20  border-b md:border-b-0 md:border-r border-white/5 relative shrink-0">
          {/* Ambient Glow for Side Panel */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(16,185,129,0.05),transparent_50%)] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-emerald-300">
                Selected Works
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Recent
              <br />
              <span className="text-emerald-500">Projects</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-sm leading-relaxed mb-8">
              Scroll to explore a collection of digital experiences designed to
              impact and inspire.
            </p>

            {/* Scroll Progress Indicator */}
            <div className="w-full max-w-xs">
              <div className="flex justify-between text-xs text-zinc-500 mb-2">
                <span>Progress</span>
                <span>{projects.length} Projects</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500"
                  style={{
                    scaleX: maxScroll > 0 ? scrollProgress / maxScroll : 0,
                    transformOrigin: "0%",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right/Bottom Scrolling Panel - Project Cards */}
        <div className="flex-1 h-full flex items-center relative overflow-hidden">
          {/* Ambient Glow for Main Area */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03),transparent_50%)] pointer-events-none" />

          <motion.div
            ref={carouselRef}
            style={{
              transform: `translateX(${-scrollProgress}px)`,
            }}
            className="flex gap-8 md:gap-16 px-8 md:px-16 items-center h-full will-change-transform"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          {/* Navigation Controls - Only visible when not locked */}
          {!isLocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-8 right-8 flex items-center gap-4 z-30"
            >
              {/* Previous Button */}
              <motion.button
                onClick={handlePrevCard}
                disabled={currentCardIndex === 0}
                className="group relative p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-emerald-500/20 hover:border-emerald-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:text-emerald-400 transition-colors" />
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              {/* Card Counter */}
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-sm font-medium text-white">
                  {currentCardIndex + 1} / {projects.length}
                </span>
              </div>

              {/* Next Button */}
              <motion.button
                onClick={handleNextCard}
                disabled={currentCardIndex === projects.length - 1}
                className="group relative p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-emerald-500/20 hover:border-emerald-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:text-emerald-400 transition-colors" />
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      className="project-card group relative shrink-0 w-[85vw] md:w-[50vw] lg:w-[45vw] h-[55vh] md:h-[65vh] overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Background Gradient & Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-10" />

      <div className="flex flex-col h-full">
        {/* Image Section */}
        <div className="relative w-full h-3/5 overflow-hidden">
          <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent" />
        </div>

        {/* Content Section */}
        <div className="relative z-20 flex-1 p-8 flex flex-col justify-between border-t border-white/5 bg-zinc-900/40">
          <div>
            {project.category && (
              <span className="text-emerald-400 text-xs font-medium tracking-wider uppercase mb-2 block">
                {project.category}
              </span>
            )}
            <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-3">
              {project.title}
            </h3>
            <p className="text-zinc-400 text-sm md:text-base line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[10px] uppercase tracking-wider text-zinc-300 bg-white/5 border border-white/10 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-emerald-500 hover:text-white border border-white/10 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                >
                  View Project <ArrowRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
