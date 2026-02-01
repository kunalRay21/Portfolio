"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { Project } from "./types";

interface Carousel3DProps {
  projects: Project[];
  scrollVelocity: number;
  onHoverChange?: (projectIndex: number | null) => void;
  onCenterChange?: (projectIndex: number) => void;
}

export default function Carousel3D({
  projects,
  scrollVelocity,
  onHoverChange,
  onCenterChange,
}: Carousel3DProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const baseVelocity = -30; // Base scrolling speed (negative = left to right)
  const cardWidth = 350;
  const gap = 32;
  // Start with offset so first card is centered
  const initialOffset =
    typeof window !== "undefined" ? window.innerWidth / 2 - cardWidth / 2 : 0;
  const x = useMotionValue(initialOffset);
  const containerRef = useRef<HTMLDivElement>(null);

  // Triple the projects for seamless infinite scroll
  const extendedProjects = [...projects, ...projects, ...projects];

  // Helper function to calculate scale based on distance from center
  const calculateScale = (cardIndex: number) => {
    if (!containerRef.current) return 1;

    const cardWidth = 350 + 32; // 350px width + 32px gap
    const containerWidth = containerRef.current.offsetWidth;
    const centerOfViewport = containerWidth / 2;

    // Calculate card's center position relative to viewport
    const cardPosition = x.get() + cardIndex * cardWidth + 350 / 2;
    const distanceFromCenter = Math.abs(centerOfViewport - cardPosition);

    // Normalize distance (0 = at center, 1 = at edge of viewport)
    const normalizedDistance = Math.min(
      distanceFromCenter / (containerWidth / 2),
      1,
    );

    // Scale from 1.2 (at center) to 0.7 (at edges) with smooth curve
    const minScale = 0.7;
    const maxScale = 1.2;
    const scale = maxScale - normalizedDistance * (maxScale - minScale);

    return scale;
  };

  useAnimationFrame((t, delta) => {
    if (!isPaused) {
      // 1. Calculate how much to move
      const velocityFactor = 1 + Math.abs(scrollVelocity) * 0.0005;
      const moveBy = (baseVelocity * delta * velocityFactor) / 1000;

      // 2. Apply movement (Moving Left)
      let newX = x.get() + moveBy;

      // 3. Calculate the EXACT width of one full set of projects
      const singleSetWidth = (cardWidth + gap) * projects.length;

      // 4. The Seamless Reset Logic
      // Account for initial offset in reset calculation
      const resetThreshold = initialOffset - singleSetWidth;
      if (newX <= resetThreshold) {
        newX = initialOffset;
      }

      x.set(newX);
    }

    // Update centered card index
    const currentPosition = Math.abs(x.get() - initialOffset);
    const centeredIndex =
      Math.floor(currentPosition / (cardWidth + gap)) % projects.length;
    onCenterChange?.(centeredIndex);
  });

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      {/* Left vignette mask */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent z-10 pointer-events-none" />

      {/* Right vignette mask */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none" />

      {/* 3D Carousel Container */}
      <motion.div
        className="flex gap-8 absolute left-0 h-full items-center will-change-transform"
        style={{
          x,
          perspective: "1200px",
        }}
      >
        {extendedProjects.map((project, index) => {
          const isHovered = hoveredIndex === index;

          // Use motion values for smooth scaling based on position
          const cardWidth = 350 + 32;
          const scale = useTransform(x, (latest) => {
            if (!containerRef.current) return 1;

            const containerWidth = containerRef.current.offsetWidth;
            const centerOfViewport = containerWidth / 2;

            // Calculate card's center position relative to viewport
            const cardPosition = latest + index * cardWidth + 350 / 2;
            const distanceFromCenter = Math.abs(
              centerOfViewport - cardPosition,
            );

            // Normalize distance (0 = at center, 1 = at edge of viewport)
            const normalizedDistance = Math.min(
              distanceFromCenter / (containerWidth / 2),
              1,
            );

            // Scale from 1.2 (at center) to 0.75 (at edges)
            const minScale = 0.75;
            const maxScale = 1.2;
            return maxScale - normalizedDistance * (maxScale - minScale);
          });

          return (
            <motion.div
              key={`${project.id}-${index}`}
              className="relative flex-shrink-0"
              style={{
                width: "350px",
                height: "450px",
                transformStyle: "preserve-3d",
                scale: isHovered ? 1.15 : scale, // Use dynamic scale when not hovered
              }}
              animate={{
                rotateY: isHovered ? 0 : -15, // Flatten on hover
                z: isHovered ? 100 : 0,
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              onMouseEnter={() => {
                setIsPaused(true);
                setHoveredIndex(index);
                // Calculate the actual project index (handle wrapped carousel)
                const actualIndex = index % projects.length;
                onHoverChange?.(actualIndex);
              }}
              onMouseLeave={() => {
                setIsPaused(false);
                setHoveredIndex(null);
                onHoverChange?.(null);
              }}
            >
              {/* Card with image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="350px"
                  className="object-cover"
                  priority={index < 6}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Border glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2"
                  animate={{
                    borderColor: isHovered
                      ? "rgba(16, 185, 129, 0.6)"
                      : "rgba(255, 255, 255, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.h3
                    className="text-2xl font-bold text-white mb-2"
                    animate={{
                      y: isHovered ? -10 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.title}
                  </motion.h3>

                  {/* Category badge */}
                  {project.category && (
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: isHovered ? 1 : 0.7,
                        y: isHovered ? 0 : 10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-xs font-medium text-emerald-300">
                        {project.category}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Shimmer effect on hover */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
